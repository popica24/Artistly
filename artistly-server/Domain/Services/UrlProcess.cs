namespace Domain.Services;

public static class URL
{
    public static string FromNameToUrl(string url)
    {
        if (url.Contains("") || url.Contains('/'))
            return url.ToLower().Replace(" ", "-").Replace("/", "-");

        return url;
    }
}
