using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Urna_backend.Data;
using Urna_backend.Models;

namespace Urna_backend.Controllers
{
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private readonly AppDatabaseContext _context;

        public CandidateController(AppDatabaseContext context)
        {
            _context = context;
        }



        [HttpGet("/GetCandidates")]
        public ActionResult<IQueryable<Candidate>> getCandidates()
        {
            return _context.Set<Candidate>();

        }

        [HttpPost("/PostCandidate")]
        public ActionResult postCandidate(Candidate candidate)
        {
            candidate.registrationDate = DateTime.Now;
            _context.Candidates.Add(candidate);
            int rowsChanged = _context.SaveChanges();
            
            if(rowsChanged == 1)
                return Ok();

            return BadRequest();
        }

        [HttpDelete("/DeleteCandidate")]
        public ActionResult deleteCandidate(Guid candidateId)
        {
            Candidate candidate = _context.Candidates.Find(candidateId);
            _context.Candidates.Remove(candidate);
            int rowsChanged = _context.SaveChanges();

            if (rowsChanged > 0)
                return Ok();
            
            return BadRequest();
        }

        [HttpPut("/EditCandidate")]
        public ActionResult<Candidate> editCandidate (Candidate candidateNew)
        {
            _context.Candidates.Update(candidateNew);
            int rowsChanged = _context.SaveChanges();

            if (rowsChanged > 0)
                return Ok();

            return BadRequest();
        }
    }
}
