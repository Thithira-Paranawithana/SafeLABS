
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SafeLABS.Controllers
{
    public class AuthClass
    {
        public static string Getconstring(IConfiguration _configuration)
        {
            try
            {
                string connstr = "Data Source=.;Initial Catalog=SAFELABS;Persist Security Info=True;User ID=admin;Password=pass";
                string password = "abc@123";

                // Encrypt the connection string and password
                string encryptedConStr = Kripta.Encrypt(connstr, "SLabsSha@#$%-=.Pas").ToString().Trim();
                string encryptedPassword = Kripta.Encrypt(password, "SLpassSha@#$%-=.Pas").ToString().Trim();

                // Get the encrypted password from configuration
                string dbp = _configuration.GetValue<string>("Kripton_Key");
                string decryptedPassword = Kripta.Decrypt(dbp, "SLpassSha@#$%-=.Pas").ToString().Trim();

                // Get and decrypt the connection string
                string conString = _configuration.GetValue<string>("ConStr");
                string finalConnectionString = Kripta.Decrypt(conString, "SLabsSha@#$%-=.Pas").ToString().Trim()
                    .Replace("pass", decryptedPassword);

                return finalConnectionString;
            }
            catch
            {
                return "";
            }
        }
    }
}