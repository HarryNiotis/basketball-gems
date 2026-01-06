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
    public class TeamsController : ControllerBase
    {
        private readonly BasketballDbContext _context;
        private readonly ILogger<TeamsController> _logger;

        public TeamsController(BasketballDbContext context, ILogger<TeamsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Team>>> GetTeams()
        {
            try
            {
                var teams = await _context.Teams.ToListAsync();
                return Ok(teams);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching teams");
                return StatusCode(500, new { error = $"Failed to fetch teams: {ex.Message}" });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Team>> GetTeam(int id)
        {
            try
            {
                var team = await _context.Teams.FindAsync(id);
                if (team == null)
                {
                    return NotFound();
                }
                return Ok(team);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching team");
                return StatusCode(500, new { error = $"Failed to fetch team: {ex.Message}" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Team>> CreateTeam(Team team)
        {
            try
            {
                _context.Teams.Add(team);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetTeam", new { id = team.Id }, team);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating team");
                return StatusCode(500, new { error = $"Failed to create team: {ex.Message}" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeam(int id, Team team)
        {
            if (id != team.Id)
            {
                return BadRequest();
            }

            try
            {
                _context.Entry(team).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok(team);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                _logger.LogError(ex, "Team not found for update");
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating team");
                return StatusCode(500, new { error = $"Failed to update team: {ex.Message}" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(int id)
        {
            try
            {
                var team = await _context.Teams.FindAsync(id);
                if (team == null)
                {
                    return NotFound();
                }

                _context.Teams.Remove(team);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting team");
                return StatusCode(500, new { error = $"Failed to delete team: {ex.Message}" });
            }
        }
    }
}
