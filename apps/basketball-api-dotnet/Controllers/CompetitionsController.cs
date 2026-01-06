using basketball_api_dotnet.Data;
using basketball_api_dotnet.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace basketball_api_dotnet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CompetitionsController : ControllerBase
    {
        private readonly BasketballDbContext _context;
        private readonly ILogger<CompetitionsController> _logger;

        public CompetitionsController(BasketballDbContext context, ILogger<CompetitionsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Competition>>> GetCompetitions()
        {
            try
            {
                var competitions = await _context.Competitions.ToListAsync();
                return Ok(competitions);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching competitions");
                return StatusCode(500, new { error = $"Failed to fetch competitions: {ex.Message}" });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Competition>> GetCompetition(int id)
        {
            try
            {
                var competition = await _context.Competitions.FindAsync(id);
                if (competition == null)
                {
                    return NotFound();
                }
                return Ok(competition);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching competition");
                return StatusCode(500, new { error = $"Failed to fetch competition: {ex.Message}" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Competition>> CreateCompetition(Competition competition)
        {
            try
            {
                _context.Competitions.Add(competition);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetCompetition", new { id = competition.Id }, competition);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating competition");
                return StatusCode(500, new { error = $"Failed to create competition: {ex.Message}" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompetition(int id, Competition competition)
        {
            if (id != competition.Id)
            {
                return BadRequest();
            }

            try
            {
                _context.Entry(competition).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok(competition);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                _logger.LogError(ex, "Competition not found for update");
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating competition");
                return StatusCode(500, new { error = $"Failed to update competition: {ex.Message}" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompetition(int id)
        {
            try
            {
                var competition = await _context.Competitions.FindAsync(id);
                if (competition == null)
                {
                    return NotFound();
                }

                _context.Competitions.Remove(competition);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting competition");
                return StatusCode(500, new { error = $"Failed to delete competition: {ex.Message}" });
            }
        }
    }
}
