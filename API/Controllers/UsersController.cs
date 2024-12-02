using System.Security.Claims;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        var users = await userRepository.GetMembersAsync();

        return Ok(users);
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<MemberDto>> GetUser(string username)
    {
        var user = await userRepository.GetMemberAsync(username);
        if (user == null)
        {
            return NotFound();
        }
        
        return user;
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto member)
    {
        var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (username == null) return BadRequest("No username found");

        var user = await userRepository.GetUserByUserNameAsync(username);

        if (user == null) return BadRequest("Not find user");

        mapper.Map(member, user);

        if (await userRepository.SaveAlllAsync()) return NoContent();

        return BadRequest("Failed to update user");
    }
}
