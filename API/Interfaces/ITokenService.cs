using API.Entities;

public interface ITokenService
{
    public string CreateToken(AppUser appUser);
}