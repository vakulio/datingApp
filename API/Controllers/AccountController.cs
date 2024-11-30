using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Username))
        {
            return BadRequest("Username already exists");
        }
        return Ok();
        // using var hmac = new HMACSHA512();

        // var user = new AppUser
        // {
        //     UserName = registerDto.Username.ToLower(),
        //     PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
        //     PasswordSalt = hmac.Key
        // };
        
        // await context.Users.AddAsync(user);
        // await context.SaveChangesAsync();
        
        // return new UserDto
        // {
        //     Username = registerDto.Username,
        //     Token = tokenService.CreateToken(user)
        // };
    }

    private async Task<bool> UserExists(string username)
    {
        return await context.Users.AnyAsync(u => u.UserName.ToLower() == username.ToLower());;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.Username.ToLower());
        if (user == null)
        {
            return Unauthorized("Username or password is incorrect");
        }
        
        using var hmac = new HMACSHA512(user.PasswordSalt);
        var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        
        if (!user.PasswordHash.SequenceEqual(passwordHash))
        {
            return Unauthorized("Username or password is incorrect");
        }
        
        return new UserDto 
        {
            Username = user.UserName,
            Token = tokenService.CreateToken(user)
        };
    }
}
