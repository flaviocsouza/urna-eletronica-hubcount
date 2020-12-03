using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Urna_backend.Business;
using Urna_backend.Enums;

namespace Urna_backend.Models
{
    public class Vote
    {
        public Vote()
        {
            id = Guid.NewGuid();
        }
        [JsonIgnore]
        public Guid id { get; set; }
        [JsonIgnore]
        public string voteCode { get; set; }
        [JsonIgnore]
        public Boolean nullVote { get; set; }
        [JsonIgnore]
        public Boolean blankVote { get; set; }
        public int captionNumber { get; set; }
        public DateTime voteDate { get; set; }
        public GovernmentRole voteFor { get; set; }
        [NotMapped]
        public string ipAdress { get; set; }

    }
}
