using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;
using SafeLABS.Middleware;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using SafeLABS.Controllers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using SafeLABS.Services;
using Microsoft.AspNetCore.Http.Features;
using SafeLABS.Services;

namespace SafeLABS
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        // This method gets called by the runtime. 
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<FormOptions>(options =>
            {
                options.MultipartBodyLengthLimit = 50 * 1024 * 1024; // 50 MB limit
            });

            var credentialsPath = Configuration["GoogleCalendar:CredentialsPath"];
            if (!System.IO.File.Exists(credentialsPath))
            {
                throw new FileNotFoundException(
                    "Google Calendar credentials file not found. Ensure the file exists and the path is correct in appsettings.json",
                    credentialsPath);
            }

            services.AddScoped<GoogleCalendarService>();

            //Adding to CORE before add Controls - Shanaka HKL
            // Adding CORS policy
            services.AddCors(x =>
            {
                x.AddPolicy("AllowOGN", Options => Options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });

            // Configuring JSON serialization
            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                {
                    // Configure serialization settings here
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                    options.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc; // Use UTC or adjust as needed
                    options.SerializerSettings.DateFormatString = "yyyy-MM-ddTHH:mm:ss"; // Specify desired date format
                });

            services.AddControllers();

            // Registering scoped service
            services.AddScoped<PasswordService>();

            // Configuring JWT authentication 
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(Options =>
                {
                    Options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"])),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };
                });
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //Linkng CORE - Shanaka HKL
            app.UseCors(Options => Options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            //

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseMiddleware<APIK_Middleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}