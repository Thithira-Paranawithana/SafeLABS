using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SafeLABS.Middleware
{
    public class APIK_Middleware
    {
        private readonly RequestDelegate _next;
        private const string SecKeyName = "PPA_KEY";
        public APIK_Middleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                if (!context.Request.Headers.TryGetValue(SecKeyName, out var SendersApiKey))
                {
                    context.Response.StatusCode = 403;
                    await context.Response.WriteAsync("Security Key was not found");
                    return;
                }

                var appSettings = context.RequestServices.GetRequiredService<IConfiguration>();
                var apiKey = appSettings.GetValue<string>(SecKeyName);

                if (!apiKey.Equals(SendersApiKey))
                {
                    context.Response.StatusCode = 400;
                    await context.Response.WriteAsync("Unauthorized client. Security Key is not valied");
                    return;
                }

                await _next(context);
            }
            catch
            {
                throw;
            }
        }
    }
}
