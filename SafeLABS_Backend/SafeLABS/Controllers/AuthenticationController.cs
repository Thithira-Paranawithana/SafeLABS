
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using SafeLABS.Models;
using System.Data;

namespace SafeLABS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthenticationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] SafeLABS_models user)
        {
            // Modified to get user details instead of just a boolean value
            DataTable dt = new DataTable();
            dt = new UserDetailsController(_configuration).VerifyLogin(user.email, user.password, user);
            string Id_ = "";
            string rId_ = "";
            string em_ = "";

            foreach (DataRow row in dt.Rows)
            {
                Id_ = row["Id"].ToString();             
                rId_ = row["role"].ToString();
                em_ = row["email"].ToString();


            }

            if (dt.Rows.Count > 0)
            {

                var token = GenerateJwtToken(user.email);
                return Ok(new
                {
                    Token = token,
                    userId = Id_,
                    role = rId_,
                    email = em_,
                    
                });
            }
            return Unauthorized("Invalid login credentials. Please try again.");
        }

        private string GenerateJwtToken(string email)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, email)
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
