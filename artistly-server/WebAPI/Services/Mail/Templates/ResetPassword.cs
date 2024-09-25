using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Services.Mail.Templates
{
    public static class ResetPassword
    {
        public static string Template => @"<!DOCTYPE html>
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
                    Resetare parola
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
                    Ați solicitat recent resetarea parolei pentru contul dvs. asociat cu adresa de e-mail
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
                    %EMAIL%
                </td>
            </tr>
            <tr>
                <td>
                    <a href=""%LINK%""
                       style=""
                        background-color: #354f52;
                        text-decoration: none;
                        color: #fff;
                        border-radius: 27.5px;
                        padding: 1rem 2rem;
                        font-weight: 500;
                        display: inline-block;
                        margin: 2rem 0;
                      "">
                        Resetare parola
                    </a>
                </td>
            </tr>
            <tr>
                <td style=""padding: 0 2rem;"">
                    <span style=""display: block; text-align: left;"">
                        Pentru a vă asigura că sunteți cel care a inițiat această solicitare, vă rugăm să accesați link-ul de resetare de mai sus în următoarele 24 de ore.
                    </span>
                    <span style=""display: block; text-align: left;"">
                        Dacă nu ați solicitat acest reset de parole, vă rugăm să ignorați acest e-mail.
                    </span>
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
    }
}