using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Urna_backend.Business;
using Urna_backend.Data;
using Urna_backend.Enums;
using Urna_backend.Models;

namespace Urna_backend.Controllers
{
    [ApiController]
    public class VoteController : ControllerBase
    {
        private readonly AppDatabaseContext _context;

        public VoteController(AppDatabaseContext context)
        {
            _context = context;
        }

        [HttpPost("/PostVote")]
        public ActionResult PostVotes(Vote vote)
        {
            vote.blankVote = vote.captionNumber == 0;
            vote.nullVote = _context.Candidates.Count(c => c.captionNumber == vote.captionNumber) == 0;
            vote.voteCode = new VoteCode { ipAdress = vote.ipAdress, voteDate = vote.voteDate }.generate();

            _context.Votes.Add(vote);
            int rowsChanged = _context.SaveChanges();
           
            if(rowsChanged == 1) 
                return Ok();
            
            return BadRequest();
        }

        [HttpGet("/GetVotes/{voteType}")]
        public ActionResult<IQueryable<Vote>> GetVotes(int voteType)
        {

            switch (voteType)
            {
                case 0:
                    return Ok(_context.Set<Vote>());
                case 1:
                    return Ok(_context.Set<Vote>().Where(v => v.voteFor == GovernmentRole.mayor));
                case 2:
                    return Ok(_context.Set<Vote>().Where(v => v.voteFor == GovernmentRole.councilor));
                case 3:
                    return Ok(_context.Set<Vote>().Where(v => v.nullVote || v.blankVote));
                default:
                    return BadRequest();
            }
        }
    }
}
