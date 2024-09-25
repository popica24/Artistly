using Domain;
using Domain.Contracts;
using Domain.Models.Clients;
using Domain.Models.Users;
using Domain.Responses;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.Clients;
using WebAPI.Models.Emails;
using WebAPI.Models.Reviews;
using WebAPI.Models.Users;
using WebAPI.Services.Firebase;
using WebAPI.Services.Mail.Contract;
using WebAPI.Services.Mail.Templates;
using WebAPI.Services.Users.Validator;

namespace WebAPI.Controllers;

[Authorize]
[ApiController]
[EnableCors("WebPolicy")]
[Route("api/[controller]")]
public class UserController(IUserService userService, IUserManagement userManagement, IEmailService emailService, IMailChimService mailChimpService) : ControllerBase
{
    [AllowAnonymous]
    [HttpPost("send-confirmation-email")]
    public async Task<IActionResult> SendConfirmationEmailAsync(string to)
    {
        try
        {
            string htmlContent = ConfirmationEmail.Template;
            string link = await FirebaseAuth.DefaultInstance.GenerateEmailVerificationLinkAsync(to);
            htmlContent = htmlContent.Replace("%LINK%", link);
            htmlContent = htmlContent.Replace("%EMAIL%", to);
            var response = emailService.SendMail("Verificare Email " + to, to, htmlContent);

            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }

    }

    [AllowAnonymous]
    [HttpPost("send-reset-password")]
    public async Task<IActionResult> SendPasswordResetAsync(string to)
    {
        try
        {
            string htmlContent = ResetPassword.Template;
            string link = await FirebaseAuth.DefaultInstance.GeneratePasswordResetLinkAsync(to);
            htmlContent = htmlContent.Replace("%LINK%", link).Replace("%EMAIL%", to);
            var response = emailService.SendMail("Resetare parola " + to, to, htmlContent);

            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }

    }

    [HttpPost("send-contact-form")]
    public async Task<IActionResult> SendContactForm([FromBody] EmailContactForm form, [FromQuery] int type)
    {
        string contactAddress = type switch
        {
            1 => "usersupport@artistly.ro",
            2 => "clientsupport@artistly.ro",
            3 => "businesssupport@artistly.ro",
            _ => "contact@artistly.ro",
        };
        try
        {
            string emailBody = $"Nume: {form.FullName}\nEmail: {form.Email}\nTelefon: {form.PhoneNumber}\nSocietate: {form.Society}\nProblema: {form.Body}";
            var response = emailService.ReceiveMail("Contact", form.Email, emailBody, contactAddress);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }

    // POST: api/user
    [HttpPost]
    public async Task<IActionResult> CreateUserAsync([FromBody] UserModel model)
    {
        if (!Validator.HandleRequest(model))
        {
            return BadRequest("Invalid ModelState");
        }

        try
        {
            var token = HttpContext.Request.Headers.Authorization.ToString().Replace("Bearer ", "");
            var decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);

            var domainUser = model.ToDomain();
            domainUser.UserId = decoded.Uid;
            domainUser.Privilege = Privilege.User;
            domainUser.FreeViewUsed = false;
            domainUser.Status = "Ordinary";
            domainUser.Categories = "";

            var dbResponse = await userService.Create(domainUser);

            if (dbResponse.StatusCode != ResponseCode.Created)
            {
                return BadRequest(dbResponse);
            }

            // Attempt to set privilege in Firebase
            var firebaseResponse = await userManagement.SetPrivilege(decoded.Uid, Privilege.User);

            if (firebaseResponse.StatusCode != ResponseCode.OK)
            {
                return BadRequest(firebaseResponse);
            }

            // Attempt to send confirmation email
            var email = decoded.Claims["email"].ToString()!;
            await SendConfirmationEmailAsync(email);

            // Attempt to add user to MailChimp
            var mailchimpCreated = await mailChimpService.CreateNewUser(email, model.FirstName, model.LastName);

            if (!mailchimpCreated)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to add user to MailChimp.");
            }

            // All operations successful, return result
            return Ok(new { firebaseResponse, dbResponse, mailchimpCreated });
        }
        catch (FirebaseAuthException ex)
        {
            return Unauthorized("Invalid or expired token.");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating the user.");
        }
    }
    // Post: api/user/request-partner
    [HttpPost("request-partner")]
    public async Task<IActionResult> RequestPartnerAsync(RequestUserModel model)
    {
        if (model == null)
        {
            return BadRequest("Model cannot be null");
        }

        var domain = model.ToDomain();

        var response = await userService.RequestPartnerAccount(domain);

        if (response.StatusCode == ResponseCode.Created)
        {
            return Ok(response);
        }
        return BadRequest(response);
    }

    // Post: api/user/request-page/userId
    [HttpPost("request-page/{userId}")]
    public async Task<IActionResult> RequestPageAsync(string userId, [FromBody] ClientRequest request)
    {
        if (!Validator.HandleClientRequest(request))
        {
            return BadRequest("Invalid data sent");
        }

        var domainModel = request.ToDomain(userId);

        if (domainModel is null)
        {
            return BadRequest("Invalid domain parse");
        }

        var response = await userService.RequestPage(domainModel);

        if (response.StatusCode == ResponseCode.Created)
        {
            return Ok(response);
        }
        return BadRequest(response);
    }

    [HttpPost("request-review/{clientId}")]
    public async Task<IActionResult> RequestReviewAsync(string clientId, [FromBody] RequestReview request)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString().Replace("Bearer ", "");

        FirebaseToken decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);

        if (request == null)
        {
            return BadRequest("Request cannot be null");
        }

        var domainModel = request.ToDomain();

        domainModel.ClientId = clientId;

        domainModel.UserId = decoded.Uid;

        var dbResponse = await userService.RequestReviewAsync(domainModel);

        if (dbResponse.StatusCode != ResponseCode.OK)
        {
            return BadRequest(dbResponse);
        }

        return Ok(dbResponse);
    }

    // GET: api/user
    [HttpGet]
    public async Task<IActionResult> GetUserAsync()
    {
        var token = HttpContext.Request.Headers.Authorization.ToString().Replace("Bearer ", "");

        FirebaseToken decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);

        var dbResponse = await userService.FirstOrDefault(decoded.Uid);

        if (dbResponse == null || dbResponse.Data is not User userModel)
        {
            return NotFound();
        }

        var newsletterEnabled = await mailChimpService.CheckEnrollStatus(decoded.Claims["email"].ToString());

        await userManagement.SetPrivilege(decoded.Uid, userModel.Privilege);

        if (userModel.Privilege == Privilege.User)
        {
            var request = new UserModel(userModel)
            {
                NewsletterEnabled = newsletterEnabled
            };
            return Ok(request);
        }
        if (userModel.Privilege == Privilege.Client || userModel.Privilege == Privilege.Admin)
        {
            var request = new PartnerModel(userModel)
            {
                NewsletterEnabled = newsletterEnabled
            };

            return Ok(request);
        }

        return BadRequest("No privilege matched");
    }

    // GET : api/user/page/userId
    [HttpGet("page/{userId}")]
    public async Task<IActionResult> GetPagesAsync(string userId)
    {
        if (string.IsNullOrEmpty(userId)) return BadRequest("User id cannot be null");

        var dbResponse = await userService.GetPages(userId);

        if (dbResponse.StatusCode != ResponseCode.OK || dbResponse.Data is not ICollection<Client> clientsManaged)
        {
            return BadRequest(dbResponse);
        }

        var models = clientsManaged.Select(client => new PageCard(client));

        return Ok(models);
    }

    // PUT : api/user
    [HttpPut]
    [Authorize]
    public async Task<IActionResult> PutUserAsync(UserModel userModel)
    {
        try
        {
            var token = HttpContext.Request.Headers.Authorization.ToString().Replace("Bearer ", "");

            FirebaseToken decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);

            var domain = userModel.ToDomain(decoded.Uid);

            await userService.Update(domain);

            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpDelete("page/{clientId}")]
    public async Task<IActionResult> DeletePageAsync(string clientId)
    {
        if (string.IsNullOrEmpty(clientId)) return BadRequest("Client id cannot be null");

        var token = HttpContext.Request.Headers.Authorization.ToString().Replace("Bearer ", "");

        FirebaseToken decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);

        var dbResponse = await userService.DeletePage(decoded.Uid, clientId);

        if (dbResponse.StatusCode == ResponseCode.OK)
        {
            return Ok();
        }
        return BadRequest();
    }

    [HttpPost("subscribe")]
    public async Task<IActionResult> Subscribe([FromQuery] string email)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString().Replace("Bearer ", "");

        FirebaseToken decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);

        if (decoded.Claims["email_verified"] is bool emailConfirmed)
        {
            if (!emailConfirmed)
            {
                return BadRequest("Confirmati emailul inainte de a activa newsletterul.");
            }
        }


        var subscribed = await mailChimpService.Subscribe(email);

        if (subscribed)
        {
            return Ok();
        }
        return BadRequest();
    }

    [HttpPost("unsubscribe")]
    public async Task<IActionResult> Unsubscribe([FromQuery] string email)
    {
        var unsubscribed = await mailChimpService.Unsubscrube(email);

        if (unsubscribed)
        {
            return Ok();
        }
        return BadRequest();
    }
}
