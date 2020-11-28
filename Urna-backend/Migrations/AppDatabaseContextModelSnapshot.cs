﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Urna_backend.Data;

namespace Urna_backend.Migrations
{
    [DbContext(typeof(AppDatabaseContext))]
    partial class AppDatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("Urna_backend.Models.Candidate", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("captionNumber")
                        .HasColumnType("int");

                    b.Property<string>("fullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("registrationDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("role")
                        .HasColumnType("int");

                    b.Property<string>("viceCandidateName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Candidates");
                });

            modelBuilder.Entity("Urna_backend.Models.Vote", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("blankVote")
                        .HasColumnType("bit");

                    b.Property<int>("captionNumber")
                        .HasColumnType("int");

                    b.Property<bool>("nullVote")
                        .HasColumnType("bit");

                    b.Property<string>("voteCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("voteDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("voteFor")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.ToTable("Votes");
                });
#pragma warning restore 612, 618
        }
    }
}
