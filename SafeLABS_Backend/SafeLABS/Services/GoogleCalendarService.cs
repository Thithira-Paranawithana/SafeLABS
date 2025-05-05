using Google.Apis.Calendar.v3;   // Provides access to Google Calendar API.
using Google.Apis.Calendar.v3.Data;
using Google.Apis.Auth.OAuth2;  // Manages Google authentication using OAuth2.
using Google.Apis.Services;   // Base services for accessing Google APIs.
using Microsoft.Extensions.Configuration;  // For managing app configuration settings.
using Microsoft.Extensions.Logging; // For logging events and errors.
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SafeLABS.Services
{
    // This is the core service class that handles Google Calendar interactions.
    public class GoogleCalendarService
    {
        // Stores the application’s configuration data (like paths to credentials, calendar IDs).
        private readonly IConfiguration _configuration;
        
        // The instance of the CalendarService that will be used to make API requests.
        private readonly CalendarService _calendarService;
        
        // For logging errors or info messages.
        private readonly ILogger<GoogleCalendarService> _logger;

        public GoogleCalendarService(IConfiguration configuration, ILogger<GoogleCalendarService> logger)
        {
            _configuration = configuration;
            _logger = logger;
            
            try
            {
                // Reads the credentials file path (CredentialsPath) from the configuration.
                var credentialsPath = _configuration["GoogleCalendar:CredentialsPath"];
                
                // Loads the credentials from a file using GoogleCredential.FromFile.
                // It can only fetch data, not modify it
                var credential = GoogleCredential.FromFile(credentialsPath)
                    .CreateScoped(CalendarService.Scope.CalendarReadonly);

                // Sets up a CalendarService instance, initializing it with the OAuth2 credentials and an application name.
                _calendarService = new CalendarService(new BaseClientService.Initializer
                {
                    HttpClientInitializer = credential,
                    ApplicationName = _configuration["GoogleCalendar:ApplicationName"] ?? "HRIS Calendar"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to initialize Google Calendar service");
                throw;
            }
        }

        // This method fetches holiday events from the specified calendars.
        public async Task<List<CalendarEvent>> GetHolidaysAsync(DateTime startDate, DateTime endDate)
        {
            try
            {
                var holidays = new List<CalendarEvent>();
                
                // Retrieves Google Calendar IDs for public holidays and mercantile holidays
                var calendarIds = new List<string>
                {
                    _configuration["GoogleCalendar:HolidayCalendarId"], // public holidays
                };

                // configures the request to fetch only non-deleted, single events, and orders them by start time.
                foreach (var calendarId in calendarIds.Where(id => !string.IsNullOrEmpty(id)))
                {
                    var request = _calendarService.Events.List(calendarId);
                    request.TimeMin = startDate;
                    request.TimeMax = endDate;
                    request.ShowDeleted = false;
                    request.SingleEvents = true;
                    request.OrderBy = EventsResource.ListRequest.OrderByEnum.StartTime;

                    var events = await request.ExecuteAsync();
                    
                    // Iterates through events and converts each Google Calendar event to a custom CalendarEvent object.
                    if (events.Items != null)
                    {
                        holidays.AddRange(events.Items.Select(e => new CalendarEvent
                        {
                            Title = e.Summary,
                            Description = e.Description,
                            StartDate = e.Start.Date != null ? DateTime.Parse(e.Start.Date) : (DateTime?)null,
                            EndDate = e.End.Date != null ? DateTime.Parse(e.End.Date) : (DateTime?)null,
                            Type = "Public Holiday"
                        }));
                    }
                }

                return holidays;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to fetch holidays from Google Calendar");
                throw;
            }
        }
    }

    public class CalendarEvent
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Type { get; set; }
    }
}