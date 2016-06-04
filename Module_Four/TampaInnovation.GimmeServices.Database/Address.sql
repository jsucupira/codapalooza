﻿CREATE TABLE [dbo].[Address]
(
	[AddressId] INT NOT NULL,
	[Active] BIT NULL,
	[AddressType] NVARCHAR(10) NULL,
	[AddressTypeId] INT NULL,
	[StreetAddress] NVARCHAR(50) NULL,
	[Additional] NVARCHAR(50) NULL,
	[City] NVARCHAR(50) NULL,
	[State] NVARCHAR(10) NULL,
    [ZipCode] NVARCHAR(10) NULL,
	[Country] NVARCHAR(50) NULL,
    [CountyOrParish] NVARCHAR(50) NULL,
    [Area] NVARCHAR(20) NULL,
	[Latitude] NUMERIC(16,8) NULL,
	[Longitude] NUMERIC(16,8) NULL,
	[Landmarks] NVARCHAR(50) NULL,
	[Provider] NVARCHAR(50) NULL,
	[ProviderId] INT NULL,
	[ProviderCreating] NVARCHAR(50) NULL,
	[DateAdded] DATETIME NULL,
	[ProviderUpdating] NVARCHAR(50) NULL,
	[DateUpdated] DATETIME NULL, 
    CONSTRAINT [PK_Address] PRIMARY KEY ([AddressId])
)

GO

CREATE INDEX AddressIdx1 ON [Address] (AddressId)
