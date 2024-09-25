using Domain;
using Domain.Contracts;
using Domain.Models.Clients;
using Domain.Models.Reviews;
using Domain.Models.Users;
using Domain.Responses;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.Clients;
using WebAPI.Services.Admin.Models.Pages;
using WebAPI.Services.Admin.Models.Reviews;
using WebAPI.Services.Admin.Models.Users;
using WebAPI.Services.Firebase;
using WebAPI.Services.Mail.Contract;
using WebAPI.Services.Pagination;

namespace WebAPI.Controllers;

[ApiController]
[EnableCors("WebPolicy")]
[Route("api/[controller]")]

// [Authorize(Policy = "AdminPolicy")]
[Authorize]
public class AdminController(IUserManagement userManagement, IAdminService adminService, IClientService clientService, IEmailService emailService, IMailChimService mailChimpService) : ControllerBase
{
    [HttpPost("approve-user/{clientId}")]
    public async Task<IActionResult> ApproveUserAsync(string clientId)
    {
        if (string.IsNullOrEmpty(clientId))
        {
            return BadRequest("User id cannot be null");
        }

        var dbResponse = await adminService.ApprovePartnerAccountAsync(clientId);

        if (dbResponse.StatusCode != ResponseCode.OK || dbResponse.Data is not Domain.Models.Users.User user)
        {
            return BadRequest(dbResponse);
        }

        var firebaseResponse = await userManagement.SetPrivilege(clientId, user.Privilege);

        UserRecord userRecord = await FirebaseAuth.DefaultInstance.GetUserAsync(clientId);

        if (firebaseResponse.StatusCode == ResponseCode.OK)
        {
            string htmlContent = @"<!DOCTYPE html>
<html lang=""en"">
<head>
    <meta charset=""UTF-8"" />
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"" />
    <link rel=""preconnect"" href=""https://fonts.googleapis.com"" />
    <link rel=""preconnect"" href=""https://fonts.gstatic.com"" crossorigin />
    <link href=""https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"" rel=""stylesheet"" />
    <title>Document</title>
</head>
<body style=""padding: 0; margin: 0; background-color: #f4f4f4;"">
    <div style=""
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        text-align: center;
      "">
        <table style=""width: 100%;"" cellpadding=""0"" border=""0"" align=""center"" cellspacing=""0"">
            <tr>
                <td style=""
                  background: #faedcd;
                  padding: 20px 0;
                  border-bottom-left-radius: 30px;
                  border-bottom-right-radius: 30px;
                "">
                   <img src=""https://artistly.ro/email/email-hero.png""
                         width=""150""
                         height=""35.34""
                         alt=""logo""
                         title=""Logo""
                         style=""display: block; margin: 0 auto;"" />
                </td>
            </tr>

            <tr>
                <td style=""
                  color: #3c3c3c;
                  font-size: 2rem;
                  font-weight: 900;
                  padding: 2rem 1rem;
                "">
                    Bun venit in echipa !
                </td>
            </tr>
            <tr>
                <td style=""
                  color: #3c3c3c;
                  font-size: 1.25rem;
                  font-weight: 600;
                  padding: 0 2rem;
                  max-width: 36ch;
                  margin: 0 auto;
                "">
                   Contul dumneavoastră de partener a fost aprobat cu succes. Aveți acum acces deplin la secțiunea dedicată Paginilor.
                </td>
            </tr>
            
            <tr>
                <td style=""
                  color: #3c3c3c;
                  font-size: 1.25rem;
                  font-weight: 600;
                  padding: 2rem 0;
                "">
                    Îți mulțumim și îți urăm o zi plăcută!
                </td>
            </tr>

            <tr style=""background: #eee;"">
                <td style=""
                  padding: 1rem;
                  border-top-left-radius: 30px;
                  border-top-right-radius: 30px;
                "">
                    <span style=""text-decoration: underline; font-weight: 500;"">Termeni si conditii</span>
                    <span style=""margin: 0 10px;"">&#x2022;</span>
                    <span style=""text-decoration: underline; font-weight: 500;"">Politica de confidentialitate</span>
                    <span style=""margin: 0 10px;"">&#x2022;</span>
                    <span style=""text-decoration: underline; font-weight: 500;"">Contact</span>
                </td>
            </tr>
            <tr style=""background: #eee;"">
                <td style=""padding: 1rem 2rem;"">
                    <span>
                        Te asigurăm de faptul că <a href=""https://artistly.ro"" target=""_blank"">artistly.ro</a> nu va vinde, închiria sau oferi sub orice formă adresa ta de e-mail sau orice altă informaţie cu caracter personal.
                    </span>
                </td>
            </tr>
            <tr style=""background: #eee;"">
                <td style=""padding: 1rem 0;"">
                    <a href=""https://www.facebook.com/artistlyro/"" style=""text-decoration: none;"">
                        <img style=""margin-right: 10px;"" src=""https://artistly.ro/email/facebook.png"" alt=""Facebook"" width=""20"" height=""20"">
                    </a>
                    <a href=""https://www.instagram.com/artistlyromania/"" style=""text-decoration: none;"">
                        <img style=""margin: 0 10px;"" src=""https://artistly.ro/email/instagram.png"" alt=""Instagram"" width=""20"" height=""20"">
                    </a>
                    <a href=""https://www.tiktok.com/@artistlyromania"" style=""text-decoration: none;"">
                        <img style=""margin: 0 10px;"" src=""https://artistly.ro/email/tiktok.png"" alt=""TikTok"" width=""17"" height=""20"">
                    </a>
                    <a href=""https://www.threads.net/@artistlyromania"" style=""text-decoration: none;"">
                        <img style=""margin-left: 10px;"" src=""https://artistly.ro/email/threads.png"" alt=""Threads"" width=""17"" height=""20"">
                    </a>
                </td>
            </tr>
            <tr style=""background: #eee;"">
                <td>
                    <img src=""https://artistly.ro/email/gray-hero.png"" alt="""" width=""20"" height=""20"">
                </td>
            </tr>

        </table>
    </div>
</body>
</html>
";
            emailService.SendMail("Contul dvs de partener a fost acceptat!", userRecord.Email, htmlContent);
            return Ok(new { dbResponse, firebaseResponse });
        }

        return BadRequest(firebaseResponse);
    }

    [HttpPost("approve-page/{pageId}")]
    public async Task<IActionResult> AppovePageAsync(string pageId)
    {
        if (string.IsNullOrEmpty(pageId))
        {
            return BadRequest("User id cannot be null");
        }

        var dbResponse = await adminService.ApprovePageAsync(pageId);

        if (dbResponse.StatusCode != ResponseCode.OK)
        {
            return BadRequest(dbResponse);
        }

        return Ok(dbResponse);
    }

    [HttpPost("dismis-page/{pageId}")]
    public async Task<IActionResult> DismissPageAsync(string pageId)
    {
        if (string.IsNullOrEmpty(pageId))
        {
            return BadRequest("User id cannot be null");
        }

        var dbResponse = await adminService.DenyPageAsync(pageId);

        if (dbResponse.StatusCode != ResponseCode.OK)
        {
            return BadRequest(dbResponse);
        }

        return Ok(dbResponse);
    }

    [HttpPost("approve-review/{reviewId}")]
    public async Task<IActionResult> ApproveReviewAsync(int reviewId)
    {
        var dbResponse = await adminService.ApproveReviewAsync(reviewId);

        if (dbResponse.StatusCode != ResponseCode.OK)
        {
            return BadRequest(dbResponse);
        }
        return Ok(dbResponse);
    }

    [HttpPost("deny-review/{reviewId}")]
    public async Task<IActionResult> DenyReviewAsync(int reviewId)
    {
        var dbResponse = await adminService.DenyReviewAsync(reviewId);
        if (dbResponse.StatusCode != ResponseCode.OK)
        {
            return BadRequest(dbResponse);
        }
        return Ok(dbResponse);

    }

    [HttpGet("list-free-users")]
    public async Task<IActionResult> ListUsersAsync([FromQuery] int pageIndex = 1)
    {
        var list = new List<FreeUserModel>();

        var dbResponse = await adminService.GetFreeUsersPaginatedAsync(pageIndex);

        if (dbResponse.StatusCode != ResponseCode.OK || dbResponse.Data is not PaginatedList<User> page)
        {
            return BadRequest(dbResponse);
        }
        foreach (var user in page)
        {
            var firebaseUser = await userManagement.GetUserAsync(user.UserId);

            if (firebaseUser.StatusCode != ResponseCode.Found || firebaseUser.Data is not UserRecord userRecord)
            {
                continue;
            }

            var freeUserModel = new FreeUserModel
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = userRecord.Email,
                PhoneNumber = user.PhoneNumber,
                NewsletterActive = await mailChimpService.CheckEnrollStatus(userRecord.Email),
                FreeViewUsed = user.FreeViewUsed,

            };
            list.Add(freeUserModel);
        }
        return Ok(list);
    }

    [HttpGet("list-partners")]
    public async Task<IActionResult> ListPartnersAsync([FromQuery] int pageIndex = 1)
    {
        var list = new List<PartnerModel>();

        var dbResponse = await adminService.GetPartnersPaginatedAsync(pageIndex);

        if (dbResponse.StatusCode != ResponseCode.OK || dbResponse.Data is not PaginatedList<User> page)
        {
            return BadRequest(dbResponse);
        }

        foreach (var user in page)
        {
            var firebaseUser = await userManagement.GetUserAsync(user.UserId);

            if (firebaseUser.StatusCode != ResponseCode.Found || firebaseUser.Data is not UserRecord userRecord)
            {
                continue;
            }

            var freeUserModel = new PartnerModel
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = userRecord.Email,
                PhoneNumber = user.PhoneNumber,
                Status = user.Status,
                Categories = user.Categories,
                NewsletterActive = await mailChimpService.CheckEnrollStatus(userRecord.Email),
                Pages = user.ClientsManaged.Select(x => x.ClientId).ToArray() ?? [],
            };
            list.Add(freeUserModel);
        }
        return Ok(list);
    }

    [HttpGet("list-requested-partners")]
    public async Task<IActionResult> ListRequestedPartnersAsync([FromQuery] int pageIndex = 1)
    {
        var list = new List<PartnerModel>();

        var dbResponse = await adminService.GetPartnerRequestsPaginatedAsync(pageIndex);

        if (dbResponse.StatusCode != ResponseCode.OK || dbResponse.Data is not PaginatedList<RequestedUser> page)
        {
            return BadRequest(dbResponse);
        }

        foreach (var user in page)
        {
            var firebaseUser = await userManagement.GetUserAsync(user.UserId);

            if (firebaseUser.StatusCode != ResponseCode.Found || firebaseUser.Data is not UserRecord userRecord)
            {
                continue;
            }

            var freeUserModel = new PartnerModel
            {
                ClientId = user.UserId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = userRecord.Email,
                PhoneNumber = user.PhoneNumber,
                Status = user.Status,
                Categories = !string.IsNullOrEmpty(user.Genre) ? user.Category + " - " + user.Subcategory + " - " + user.Genre : user.Category + " - " + user.Subcategory
            };
            list.Add(freeUserModel);
        }
        return Ok(list);
    }

    [HttpGet("list-requested-pages")]
    public async Task<IActionResult> ListPageRequestsAsync([FromQuery] int pageIndex = 1)
    {
        var list = new List<PageRequestModel>();

        var dbResponse = await adminService.GetPageRequestsAsync(pageIndex);

        if (dbResponse.StatusCode != ResponseCode.OK || dbResponse.Data is not PaginatedList<Client> page)
        {
            return BadRequest(dbResponse);
        }

        foreach (var user in page)
        {
            var firebaseUser = await userManagement.GetUserAsync(user.UserId);

            if (firebaseUser.StatusCode != ResponseCode.Found || firebaseUser.Data is not UserRecord userRecord || user.User == null)
            {
                continue;
            }

            var freeUserModel = new PageRequestModel
            {
                ClientId = user.ClientId,
                FirstName = user.User.FirstName,
                LastName = user.User.LastName,
                Email = userRecord.Email,
                PhoneNumber = user.User.PhoneNumber,
                Status = user.User.Status,
                Categories = user.User.Categories,
                Name = user.ClientName,
                PageCategories = user.SubcategoryId + " - " + user.MusicGenre.ToString(),
                Description = user.Description,
                EventDetails = user.EventDetails,
                Prices = user.Prices.Select(price => new PriceModel(price)).ToList(),
                ContactName = user.ContactName,
                ContactNumber = user.ContactNumber,
                ContactEmail = user.ContactEmail,
                Location = user.Location.ToString()
            };
            list.Add(freeUserModel);
        }
        return Ok(list);
    }

    [HttpGet("list-pages")]
    public async Task<IActionResult> ListPagesAsync([FromQuery] int pageIndex = 1)
    {
        var list = new List<PageModel>();

        var dbResponse = await adminService.GetPagesPaginatedAsync(pageIndex);

        if (dbResponse.StatusCode != ResponseCode.OK || dbResponse.Data is not PaginatedList<Client> page)
        {
            return BadRequest(dbResponse);
        }

        foreach (var user in page)
        {
            var firebaseUser = await userManagement.GetUserAsync(user.UserId);

            if (firebaseUser.StatusCode != ResponseCode.Found || firebaseUser.Data is not UserRecord userRecord || user.User == null)
            {
                continue;
            }

            var freeUserModel = new PageModel
            {
                Email = userRecord.Email,
                ClientId = user.ClientId,
                ClientName = user.ClientName,
                ClientTag = user.ClientTag
            };
            list.Add(freeUserModel);
        }

        var groupedList = list.GroupBy(x => x.Email);

        var transformedList = groupedList.Select(group => new
        {
            email = group.Key,
            pages = group.Select(x => new PageModel { ClientId = x.ClientId, ClientName = x.ClientName, ClientTag = x.ClientTag }).ToArray()
        }).ToList();

        return Ok(transformedList);
    }

    [HttpGet("list-requested-reviews")]
    public async Task<IActionResult> ListReviewRequestsAsync([FromQuery] int pageIndex = 1)
    {
        var list = new List<ReviewModel>();

        var dbResponse = await adminService.GetReviewRequestsPaginatedAsync(pageIndex);

        if (dbResponse.StatusCode != ResponseCode.OK || dbResponse.Data is not PaginatedList<RequestedReview> page)
        {
            return BadRequest(dbResponse);
        }

        foreach (var user in page)
        {
            var firebaseUser = await userManagement.GetUserAsync(user.UserId);

            if (firebaseUser.StatusCode != ResponseCode.Found || firebaseUser.Data is not UserRecord userRecord || user.User == null || user.Client == null)
            {
                continue;
            }

            var freeUserModel = new ReviewModel
            {
                ReqId = user.ReviewId,
                FirstName = user.User.FirstName,
                LastName = user.User.LastName,
                Email = userRecord.Email,
                ReviewTitle = user.ReviewTitle,
                Rating = user.ReviewValue,
                ReviewBody = user.ReviewBody,
                ClientName = user.Client.ClientName,
                ClientTag = user.Client.ClientTag
            };
            list.Add(freeUserModel);
        }
        return Ok(list);
    }

    [HttpGet("list-reviews")]
    public async Task<IActionResult> ListReviewAsync([FromQuery] int pageIndex = 1)
    {
        var list = new List<ReviewModel>();

        var dbResponse = await adminService.GetReviewsPaginatedAsync(pageIndex);

        if (dbResponse.StatusCode != ResponseCode.OK || dbResponse.Data is not PaginatedList<Review> page)
        {
            return BadRequest(dbResponse);
        }

        foreach (var user in page)
        {
            var firebaseUser = await userManagement.GetUserAsync(user.UserId);

            if (firebaseUser.StatusCode != ResponseCode.Found || firebaseUser.Data is not UserRecord userRecord || user.User == null || user.Client == null)
            {
                continue;
            }

            var freeUserModel = new ReviewModel
            {
                ReqId = user.ReviewId,
                ClientHandle = user.ClientId,
                FirstName = user.User.FirstName,
                LastName = user.User.LastName,
                Email = userRecord.Email,
                ReviewTitle = user.ReviewTitle,
                Rating = user.ReviewValue,
                ReviewBody = user.ReviewBody,
                ClientName = user.Client.ClientName,
                ClientTag = user.Client.ClientTag
            };
            list.Add(freeUserModel);
        }
        return Ok(list);
    }

    [HttpGet("top-clients")]
    public async Task<IActionResult> GetTopClientsAsync()
    {
        var dbResponse = await clientService.GetTopClients();

        if (dbResponse.StatusCode != ResponseCode.OK || dbResponse.Data is not List<Client> data)
        {
            return BadRequest(dbResponse.StatusCode);
        }



        return Ok(data.Select(x => new ClientCard(x)).ToList());
    }

    [HttpPost("promote-top-client/{clientHandle}/{promotedPlace}")]
    public async Task<IActionResult> PromoteTopClientAsync(string clientHandle, string promotedPlace)
    {
        if (Enum.TryParse(promotedPlace, out PromotedPlace promotedPlaceEnum))
        {
            var dbResponse = await adminService.PromoteAsync(clientHandle, promotedPlaceEnum);

            if (dbResponse.StatusCode == ResponseCode.NotFound)
            {
                return NotFound(dbResponse);
            }

            if (dbResponse.StatusCode == ResponseCode.OK)
            {
                return Ok();
            }

            return BadRequest(dbResponse);
        }
        else
        {
            return BadRequest();
        }
    }
}
