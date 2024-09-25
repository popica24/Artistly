using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial__Migration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    CategoryId = table.Column<string>(type: "text", nullable: false),
                    CategoryName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "RequestedUser",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    DateAdded = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Category = table.Column<string>(type: "text", nullable: false),
                    Subcategory = table.Column<string>(type: "text", nullable: false),
                    Genre = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequestedUser", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    StripeId = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    FreeViewUsed = table.Column<bool>(type: "boolean", nullable: false),
                    Privilege = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Categories = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Subcategory",
                columns: table => new
                {
                    SubcategoryId = table.Column<string>(type: "text", nullable: false),
                    SubcategoryName = table.Column<string>(type: "text", nullable: true),
                    CategoryId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subcategory", x => x.SubcategoryId);
                    table.ForeignKey(
                        name: "FK_Subcategory_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "CategoryId");
                });

            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    ClientId = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClientName = table.Column<string>(type: "text", nullable: false),
                    ClientTag = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    EventDetails = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    ContactName = table.Column<string>(type: "text", nullable: false),
                    ContactType = table.Column<string>(type: "text", nullable: false),
                    ContactNumber = table.Column<string>(type: "text", nullable: false),
                    ContactEmail = table.Column<string>(type: "text", nullable: false),
                    Facebook = table.Column<string>(type: "text", nullable: false),
                    Instagram = table.Column<string>(type: "text", nullable: false),
                    Tiktok = table.Column<string>(type: "text", nullable: false),
                    Youtube = table.Column<string>(type: "text", nullable: false),
                    YoutubeLinks = table.Column<string[]>(type: "text[]", nullable: false),
                    ClientRating = table.Column<int>(type: "integer", nullable: false),
                    SubcategoryId = table.Column<string>(type: "text", nullable: true),
                    MusicGenre = table.Column<string>(type: "text", nullable: true),
                    Location = table.Column<string>(type: "text", nullable: false),
                    PromotedPlace = table.Column<string>(type: "text", nullable: true),
                    Approved = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Client", x => x.ClientId);
                    table.ForeignKey(
                        name: "FK_Client_Subcategory_SubcategoryId",
                        column: x => x.SubcategoryId,
                        principalTable: "Subcategory",
                        principalColumn: "SubcategoryId");
                    table.ForeignKey(
                        name: "FK_Client_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExtendedReview",
                columns: table => new
                {
                    ExtendedReviewId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ClientId = table.Column<string>(type: "text", nullable: false),
                    OneStar = table.Column<int>(type: "integer", nullable: false),
                    TwoStar = table.Column<int>(type: "integer", nullable: false),
                    ThreeStar = table.Column<int>(type: "integer", nullable: false),
                    FourStar = table.Column<int>(type: "integer", nullable: false),
                    FiveStar = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExtendedReview", x => x.ExtendedReviewId);
                    table.ForeignKey(
                        name: "FK_ExtendedReview_Client_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Client",
                        principalColumn: "ClientId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Price",
                columns: table => new
                {
                    PriceId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ClientId = table.Column<string>(type: "text", nullable: true),
                    PriceTitle = table.Column<string>(type: "text", nullable: false),
                    PriceDescription = table.Column<string>(type: "text", nullable: false),
                    PriceValue = table.Column<int>(type: "integer", nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Price", x => x.PriceId);
                    table.ForeignKey(
                        name: "FK_Price_Client_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Client",
                        principalColumn: "ClientId");
                });

            migrationBuilder.CreateTable(
                name: "RequestedReview",
                columns: table => new
                {
                    ReviewId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ClientId = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    DateAdded = table.Column<string>(type: "text", nullable: false),
                    ReviewTitle = table.Column<string>(type: "text", nullable: false),
                    ReviewBody = table.Column<string>(type: "text", nullable: false),
                    ReviewValue = table.Column<int>(type: "integer", nullable: false),
                    DateRequested = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequestedReview", x => x.ReviewId);
                    table.ForeignKey(
                        name: "FK_RequestedReview_Client_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Client",
                        principalColumn: "ClientId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RequestedReview_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Review",
                columns: table => new
                {
                    ClientId = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ReviewId = table.Column<int>(type: "integer", nullable: false),
                    DateAdded = table.Column<string>(type: "text", nullable: false),
                    ReviewTitle = table.Column<string>(type: "text", nullable: false),
                    ReviewBody = table.Column<string>(type: "text", nullable: false),
                    ReviewValue = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Review", x => new { x.UserId, x.ClientId });
                    table.ForeignKey(
                        name: "FK_Review_Client_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Client",
                        principalColumn: "ClientId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Review_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Client_SubcategoryId",
                table: "Client",
                column: "SubcategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Client_UserId",
                table: "Client",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ExtendedReview_ClientId",
                table: "ExtendedReview",
                column: "ClientId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Price_ClientId",
                table: "Price",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_RequestedReview_ClientId",
                table: "RequestedReview",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_RequestedReview_UserId",
                table: "RequestedReview",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Review_ClientId",
                table: "Review",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Subcategory_CategoryId",
                table: "Subcategory",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExtendedReview");

            migrationBuilder.DropTable(
                name: "Price");

            migrationBuilder.DropTable(
                name: "RequestedReview");

            migrationBuilder.DropTable(
                name: "RequestedUser");

            migrationBuilder.DropTable(
                name: "Review");

            migrationBuilder.DropTable(
                name: "Client");

            migrationBuilder.DropTable(
                name: "Subcategory");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Category");
        }
    }
}
