using Domain.Models.Categories;
using Microsoft.EntityFrameworkCore;
using WebAPI.Context;

namespace WebAPI.Utils
{
    public static class DbSeeder
    {
        public static void SeedData(IServiceProvider serviceProvider)
        {
            using var _context = new ApplicationDbContext(serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>());
            SeedCategories(_context);
            SeedSubcategories(_context);
            _context.SaveChanges();

        }

        private static void SeedCategories(ApplicationDbContext _context)
        {
            if (_context.Category.Any())
            {
                return;
            }

            var categories = new List<Category>
            {
                new () { CategoryId = "muzica", CategoryName = "Muzica" },
                new () { CategoryId = "foto-video", CategoryName = "Foto/Video" },
                new () { CategoryId = "locatii", CategoryName = "Locatii" },
                new () { CategoryId = "cofetarii", CategoryName = "Cofetării" },
                new () { CategoryId = "diverse", CategoryName = "Diverse" },
            };

            _context.Category.AddRange(categories);
        }


        private static void SeedSubcategories(ApplicationDbContext _context)
        {
            if(_context.Subcategory.Any())
            {
                return;
            }

            var subcategories = new List<Subcategory>
            {
                new() { SubcategoryId = "solisti", SubcategoryName = "Soliști", CategoryId = "muzica" },
                new() { SubcategoryId = "orchestre", SubcategoryName = "Orchestre", CategoryId = "muzica" },
                new() { SubcategoryId = "banduri", SubcategoryName = "Banduri", CategoryId = "muzica" },
                new() { SubcategoryId = "dj", SubcategoryName = "DJ", CategoryId = "muzica" },

                new() { SubcategoryId = "fotografi", SubcategoryName = "Fotografi", CategoryId = "foto-video" },
                new() { SubcategoryId = "videografi", SubcategoryName = "Videografi", CategoryId = "foto-video" },
                new() { SubcategoryId = "cabine-foto", SubcategoryName = "Cabine foto", CategoryId = "foto-video" },

                new() { SubcategoryId = "corturi", SubcategoryName = "Corturi", CategoryId = "locatii" },
                new() { SubcategoryId = "restaurante", SubcategoryName = "Restaurante", CategoryId = "locatii" },
                new() { SubcategoryId = "cluburi", SubcategoryName = "Cluburi", CategoryId = "locatii" },
                new() { SubcategoryId = "mobile", SubcategoryName = "Mobile", CategoryId = "locatii" },

                new() { SubcategoryId = "candy-bar", SubcategoryName = "Candy Bar", CategoryId = "cofetarii" },
                new() { SubcategoryId = "torturi", SubcategoryName = "Torturi", CategoryId = "cofetarii" },

                new() { SubcategoryId = "pirotehnisti", SubcategoryName = "Pirotehnisti", CategoryId = "diverse" },
                new() { SubcategoryId = "mc", SubcategoryName = "MC", CategoryId = "diverse" },
                new() { SubcategoryId = "barmani", SubcategoryName = "Barmani", CategoryId = "diverse" },
                new() { SubcategoryId = "tipografii", SubcategoryName = "Tipografii", CategoryId = "diverse" },
                new() { SubcategoryId = "marturii", SubcategoryName = "Mărturii", CategoryId = "diverse" },
                new() { SubcategoryId = "entertaiment", SubcategoryName = "Entertaiment", CategoryId = "diverse" },
                new() { SubcategoryId = "aranjamente-florale", SubcategoryName = "Aranjamente florale", CategoryId = "diverse" },
            };

            _context.AddRange(subcategories);
               
            
        }
    }
}
