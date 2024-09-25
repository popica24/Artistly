namespace WebAPI.Services.Clients.Utils
{
    public static class TagCreator
    {
        public static string Create(string subcategory)
        {
            switch (subcategory)
            {
                case "videografi":
                    return "Videograf";
                case "torturi":
                    return "Tort";
                case "tipografii":
                    return "Tipografie";
                case "solisti":
                    return "Solist";
                case "restaurante":
                    return "Restaurant";
                case "pirotehnisti":
                    return "Pirotehnist";
                case "orchestre":
                    return "Orchestra";
                case "fotografi":
                    return "Fotograf";
                case "corturi":
                    return "Cort";
                case "cluburi":
                    return "Club";
                case "cabine-foto":
                    return "Cabina Foto";
                case "barmani":
                    return "Barman";
                case "banduri":
                    return "Band";
                default: return subcategory;
            }
        }
    }
}
