namespace SafeLABS.Controllers;

public class PasswordService
{
    public bool checkPassword(string password, string storedHash)
    {
        return BCrypt.Net.BCrypt.Verify(password, storedHash);
    }
}