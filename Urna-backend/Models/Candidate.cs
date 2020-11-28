using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Urna_backend.Enums;

namespace Urna_backend.Models
{
    public class Candidate
    {
        public Candidate()
        {
            id = Guid.NewGuid();
        }
        public Guid id { get; set; }
        public string fullName { get; set; }
        public string viceCandidateName { get; set; }
        public DateTime registrationDate { get; set; }
        public int captionNumber { get; set; }
        public GovernmentRole role { get; set;  }
    }
}
