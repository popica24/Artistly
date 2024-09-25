namespace WebAPI.Utils;

public static class NameProcessor
{
    public static string IdHandle(string name)
    {
        string lowerName = name.ToLower();
        string normalizedName = lowerName.Trim().Replace(" ","-");
        return normalizedName;
    }
}
