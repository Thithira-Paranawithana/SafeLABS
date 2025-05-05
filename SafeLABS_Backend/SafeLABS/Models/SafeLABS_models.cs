
using System;
using System.ComponentModel.DataAnnotations;

namespace SafeLABS.Models
{
    public class SafeLABS_models
    {
        public int? Id { get; set; }
        public string? userId { get; set; }
        public string? resourceType { get; set; }
        public int? typeId { get; set; }
        public int? updateBy { get; set; }
        public int? isActive { get; set; }
        public int? isToAll { get; set; }
        public string? description { get; set; }
        public string? dbPassword { get; set; }
        public string? role { get; set; }
        public string? date { get; set; }
        public string? insertDate { get; set; }
        public TimeSpan? checkInTime { get; set; }
        public TimeSpan? checkOutTime { get; set; }
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string? name { get; set; }
        public int? contactNo { get; set; }
        public int? AttendanceCount { get; set; }
        public int? roleId { get; set; }
        public string? email { get; set; }
        public string? password { get; set; }
        public string? nic { get; set; }
        public string? addressLine1 { get; set; }
        public string? addressLine2 { get; set; }
        public string? address { get; set; }
        public string? city { get; set; }
        public string? newPassword { get; set; }
        public string? currentPassword { get; set; }
        public string? PasswordCheckResult { get; set; }
        public int? resourceTypeId { get; set; }
        public decimal? price { get; set; }
        public string? brand { get; set; }
        public int? resourceId { get; set; }
        public int? insertBy { get; set; }
    }
}