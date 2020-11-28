using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Urna_backend.Models;

namespace Urna_backend.Data
{
    public class AppDatabaseContext : DbContext
    {
        
        public AppDatabaseContext(DbContextOptions<AppDatabaseContext> options)
        : base(options)
        { }

        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<Vote> Votes { get; set; }
    }
}    
