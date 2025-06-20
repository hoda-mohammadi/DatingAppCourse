using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using Microsoft.IdentityModel.Tokens;
using SQLitePCL;

public class TokenService(IConfiguration config) : ITokenService
{
    public string CreateToken(AppUser appUser)
    {
        var tokenKey = config["TokenKey"] ?? throw new Exception("cannot access tokenKey from appsettings!");
        if (tokenKey.Length < 64) throw new Exception("your tokenKey needs to be longer");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, appUser.UserName)        
        };

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDiscriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDiscriptor);

        return tokenHandler.WriteToken(token);
    }
}