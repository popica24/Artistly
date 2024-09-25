using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models.Emails
{
    public record EmailContactForm(string FullName, string Email, string PhoneNumber, string Society, string Body);
}