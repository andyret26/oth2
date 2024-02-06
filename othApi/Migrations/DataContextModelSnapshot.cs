﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using othApi.Data;

#nullable disable

namespace othApi.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("PlayerTournament", b =>
                {
                    b.Property<int>("TeamMatesId")
                        .HasColumnType("integer");

                    b.Property<int>("TournamentsId")
                        .HasColumnType("integer");

                    b.HasKey("TeamMatesId", "TournamentsId");

                    b.HasIndex("TournamentsId");

                    b.ToTable("PlayerTournament", (string)null);
                });

            modelBuilder.Entity("othApi.Data.Entities.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Avatar_url")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Country_code")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Global_rank")
                        .HasColumnType("integer");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("othApi.Data.Entities.Tournament", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AddedById")
                        .HasColumnType("integer");

                    b.Property<string>("BracketLink")
                        .HasColumnType("text");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Format")
                        .HasColumnType("text");

                    b.Property<string>("ForumPostLink")
                        .HasColumnType("text");

                    b.Property<string>("ImageLink")
                        .HasColumnType("text");

                    b.Property<string>("MainSheetLink")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Notes")
                        .HasColumnType("text");

                    b.Property<string>("Placement")
                        .HasColumnType("text");

                    b.Property<string>("RankRange")
                        .HasColumnType("text");

                    b.Property<int?>("Seed")
                        .HasColumnType("integer");

                    b.Property<string>("TeamName")
                        .HasColumnType("text");

                    b.Property<string>("TeamSize")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AddedById");

                    b.ToTable("Tournaments");
                });

            modelBuilder.Entity("PlayerTournament", b =>
                {
                    b.HasOne("othApi.Data.Entities.Player", null)
                        .WithMany()
                        .HasForeignKey("TeamMatesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("othApi.Data.Entities.Tournament", null)
                        .WithMany()
                        .HasForeignKey("TournamentsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("othApi.Data.Entities.Tournament", b =>
                {
                    b.HasOne("othApi.Data.Entities.Player", "AddedBy")
                        .WithMany()
                        .HasForeignKey("AddedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AddedBy");
                });
#pragma warning restore 612, 618
        }
    }
}
