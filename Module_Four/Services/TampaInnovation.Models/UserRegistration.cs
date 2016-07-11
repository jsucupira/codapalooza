﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TampaInnovation.Models
{
    public class UserRegistration
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public string MarriageStatus { get; set; }
        public string FamilyCount { get; set; }
        public DateTime CreatedDate  { get; set; } = DateTime.UtcNow;
    }
}
