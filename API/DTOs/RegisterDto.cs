using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    [MaxLength(100)]
    public required string Username { get; set;} = string.Empty;

    [Required]
    public string? KnowsAs { get; set;} 

    [Required]
    public string? Gender { get; set;} 
    
    [Required]
    public string? DateOfBirth { get; set;} 
    
    [Required]
    public string? City { get; set;} 
    
    [Required]
    public string? Country { get; set;} 

    [Required]
    [StringLength(10, MinimumLength = 4)]
    public required string Password { get; set;}
}
