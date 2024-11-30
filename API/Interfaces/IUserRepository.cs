using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IUserRepository
{
    void Update(AppUser user);
    Task<bool> SaveAlllAsync();
    Task<IEnumerable<AppUser>> GetUsersAsync();
    Task<AppUser?> GetUserByIdAsync(string userId);
    Task<AppUser?> GetUserByUserNameAsync(string userName);
    Task<IEnumerable<MemberDto>> GetMembersAsync();
    Task<MemberDto?> GetMemberAsync(string userName);
}
