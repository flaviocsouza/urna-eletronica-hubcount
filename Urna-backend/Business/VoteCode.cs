using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Urna_backend.Business
{
    public class VoteCode
    {
        public string ipAdress { get; set; }
        public DateTime voteDate { get; set; }

        public string generate()
        {
            return String.Concat(voteDate, ipAdress);
        }
        
    }
}
