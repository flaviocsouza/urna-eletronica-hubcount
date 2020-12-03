using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Urna_backend.Business
{
    public class VoteCode
    {
        public string ipAdress { get; set; }
        public DateTime voteDate { get; set; }

        public string generate()
        {
            MD5 hash = MD5.Create();
            StringBuilder stringBuilder = new StringBuilder();

            String strVoteDate = voteDate.ToString("yyyyMMdd");
            String strCode = String.Concat(strVoteDate, ipAdress);
            byte[] btCode = hash.ComputeHash(Encoding.UTF8.GetBytes(strCode));

            foreach( byte bt in btCode)
                stringBuilder.Append(bt.ToString("x2"));

            return stringBuilder.ToString();
               
        }
        
    }
}
