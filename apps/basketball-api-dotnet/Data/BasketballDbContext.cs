using basketball_api_dotnet.Models;
using Microsoft.EntityFrameworkCore;

namespace basketball_api_dotnet.Data
{
    public class BasketballDbContext : DbContext
    {
        public BasketballDbContext(DbContextOptions<BasketballDbContext> options) : base(options)
        {
        }

        public DbSet<Team> Teams { get; set; }
        public DbSet<Competition> Competitions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Team entity
            modelBuilder.Entity<Team>()
                .HasKey(t => t.Id);
            
            modelBuilder.Entity<Team>()
                .Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(255);

            modelBuilder.Entity<Team>()
                .Property(t => t.Code)
                .HasMaxLength(10);

            modelBuilder.Entity<Team>()
                .HasIndex(t => t.Name)
                .IsUnique();

            modelBuilder.Entity<Team>()
                .ToTable("Teams");

            // Configure Competition entity
            modelBuilder.Entity<Competition>()
                .HasKey(c => c.Id);
            
            modelBuilder.Entity<Competition>()
                .Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(255);


            modelBuilder.Entity<Competition>()
                .ToTable("Competitions");
        }
    }
}
