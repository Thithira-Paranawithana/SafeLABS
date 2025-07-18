USE [SAFELABS]
GO
/****** Object:  Table [dbo].[tblAnnouncement]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblAnnouncement](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[description] [varchar](255) NOT NULL,
	[isToAll] [int] NOT NULL,
	[updateDate] [datetime] NULL,
	[updateBy] [int] NULL,
	[insertDate] [datetime] NOT NULL,
	[insertBy] [int] NOT NULL,
	[isActive] [int] NOT NULL,
 CONSTRAINT [PK_tblAnnouncement] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblAttendance]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblAttendance](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [int] NOT NULL,
	[date] [date] NOT NULL,
	[checkInTime] [time](3) NOT NULL,
	[checkOutTime] [time](3) NULL,
	[updateDate] [datetime] NULL,
	[updateBy] [int] NULL,
	[insertDate] [datetime] NOT NULL,
	[insertBy] [int] NOT NULL,
	[isActive] [int] NOT NULL,
 CONSTRAINT [PK_tblAttendance] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblImageId]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblImageId](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [int] NOT NULL,
	[imageId] [varchar](15) NOT NULL,
	[updateDate] [datetime] NULL,
	[updateBy] [int] NULL,
	[insertDate] [datetime] NOT NULL,
	[insertBy] [int] NOT NULL,
	[isActive] [int] NOT NULL,
 CONSTRAINT [PK_tblImageId] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblResource]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblResource](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[resourceTypeId] [int] NOT NULL,
	[brand] [varchar](50) NULL,
	[price] [decimal](18, 2) NULL,
	[updateDate] [datetime] NULL,
	[updateBy] [int] NULL,
	[insertDate] [datetime] NOT NULL,
	[insertBy] [int] NOT NULL,
	[isActive] [int] NOT NULL,
 CONSTRAINT [PK_tblResource] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblResourceType]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblResourceType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[resourceType] [varchar](50) NULL,
	[updateDate] [datetime] NULL,
	[updateBy] [int] NULL,
	[insertDate] [datetime] NOT NULL,
	[insertBy] [int] NOT NULL,
	[isActive] [int] NOT NULL,
 CONSTRAINT [PK_tblResourceType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblRole]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblRole](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[description] [varchar](25) NOT NULL,
	[updateDate] [datetime] NULL,
	[updateBy] [int] NULL,
	[insertDate] [datetime] NOT NULL,
	[insertBy] [int] NOT NULL,
	[isActive] [int] NOT NULL,
 CONSTRAINT [PK_tblRole] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblUser]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUser](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[roleId] [int] NOT NULL,
	[firstName] [varchar](25) NOT NULL,
	[lastName] [varchar](25) NOT NULL,
	[email] [varchar](50) NULL,
	[password] [nvarchar](30) NOT NULL,
	[nic] [varchar](20) NOT NULL,
	[addressLine1] [nvarchar](255) NOT NULL,
	[addressLine2] [nvarchar](255) NULL,
	[city] [varchar](25) NOT NULL,
	[contactNo] [bigint] NOT NULL,
	[updateDate] [datetime] NULL,
	[updateBy] [int] NULL,
	[insertDate] [datetime] NOT NULL,
	[insertBy] [int] NOT NULL,
	[isActive] [int] NOT NULL,
 CONSTRAINT [PK_tblUser] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[tblAnnouncement] ON 

INSERT [dbo].[tblAnnouncement] ([Id], [description], [isToAll], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (1, N'Hello everyone', 1, NULL, NULL, CAST(N'2024-12-28T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblAnnouncement] ([Id], [description], [isToAll], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (2, N'New Announcement 1', 1, NULL, NULL, CAST(N'2024-12-28T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblAnnouncement] ([Id], [description], [isToAll], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (3, N'New Announcement 2', 1, NULL, NULL, CAST(N'2025-03-16T13:36:56.287' AS DateTime), 1, 1)
INSERT [dbo].[tblAnnouncement] ([Id], [description], [isToAll], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (4, N'New Announcement 3', 0, NULL, NULL, CAST(N'2025-03-16T13:39:29.603' AS DateTime), 1, 1)
INSERT [dbo].[tblAnnouncement] ([Id], [description], [isToAll], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (5, N'Important Announcement 1', 0, NULL, NULL, CAST(N'2025-03-16T14:48:58.030' AS DateTime), 4, 1)
INSERT [dbo].[tblAnnouncement] ([Id], [description], [isToAll], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (6, N'There is a meeting on 30th March 2025 for everyone', 1, NULL, NULL, CAST(N'2025-03-16T17:39:50.990' AS DateTime), 4, 1)
SET IDENTITY_INSERT [dbo].[tblAnnouncement] OFF
GO
SET IDENTITY_INSERT [dbo].[tblAttendance] ON 

INSERT [dbo].[tblAttendance] ([Id], [userId], [date], [checkInTime], [checkOutTime], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (1, 1, CAST(N'2024-11-12' AS Date), CAST(N'15:24:32' AS Time), NULL, NULL, NULL, CAST(N'2024-11-12T15:24:32.533' AS DateTime), 1, 1)
INSERT [dbo].[tblAttendance] ([Id], [userId], [date], [checkInTime], [checkOutTime], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (2, 2, CAST(N'2024-11-12' AS Date), CAST(N'15:29:33' AS Time), NULL, NULL, NULL, CAST(N'2024-11-12T15:29:33.293' AS DateTime), 1, 1)
INSERT [dbo].[tblAttendance] ([Id], [userId], [date], [checkInTime], [checkOutTime], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (3, 2, CAST(N'2024-11-12' AS Date), CAST(N'15:30:55' AS Time), NULL, NULL, NULL, CAST(N'2024-11-12T15:30:55.093' AS DateTime), 1, 1)
INSERT [dbo].[tblAttendance] ([Id], [userId], [date], [checkInTime], [checkOutTime], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (4, 1, CAST(N'2024-11-12' AS Date), CAST(N'16:09:30' AS Time), NULL, NULL, NULL, CAST(N'2024-11-12T16:09:30.250' AS DateTime), 1, 1)
INSERT [dbo].[tblAttendance] ([Id], [userId], [date], [checkInTime], [checkOutTime], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (5, 1, CAST(N'2024-11-12' AS Date), CAST(N'16:12:45' AS Time), NULL, NULL, NULL, CAST(N'2024-11-12T16:12:45.270' AS DateTime), 1, 1)
INSERT [dbo].[tblAttendance] ([Id], [userId], [date], [checkInTime], [checkOutTime], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (6, 3, CAST(N'2024-11-12' AS Date), CAST(N'16:23:12' AS Time), NULL, NULL, NULL, CAST(N'2024-11-12T16:23:12.713' AS DateTime), 1, 1)
INSERT [dbo].[tblAttendance] ([Id], [userId], [date], [checkInTime], [checkOutTime], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (7, 1, CAST(N'2024-11-12' AS Date), CAST(N'16:53:15' AS Time), NULL, NULL, NULL, CAST(N'2024-11-12T16:53:15.330' AS DateTime), 1, 1)
INSERT [dbo].[tblAttendance] ([Id], [userId], [date], [checkInTime], [checkOutTime], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (12, 1, CAST(N'2025-03-14' AS Date), CAST(N'20:43:48' AS Time), NULL, NULL, NULL, CAST(N'2025-03-14T20:43:48.983' AS DateTime), 1, 1)
INSERT [dbo].[tblAttendance] ([Id], [userId], [date], [checkInTime], [checkOutTime], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (13, 2, CAST(N'2025-03-16' AS Date), CAST(N'20:46:04' AS Time), NULL, NULL, NULL, CAST(N'2025-03-14T20:46:04.540' AS DateTime), 1, 1)
INSERT [dbo].[tblAttendance] ([Id], [userId], [date], [checkInTime], [checkOutTime], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (14, 1, CAST(N'2025-03-16' AS Date), CAST(N'14:41:14' AS Time), NULL, NULL, NULL, CAST(N'2025-03-16T14:41:14.213' AS DateTime), 1, 1)
INSERT [dbo].[tblAttendance] ([Id], [userId], [date], [checkInTime], [checkOutTime], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (20, 1, CAST(N'2025-03-25' AS Date), CAST(N'21:25:00' AS Time), NULL, NULL, NULL, CAST(N'2025-03-25T21:25:00.577' AS DateTime), 1, 1)
INSERT [dbo].[tblAttendance] ([Id], [userId], [date], [checkInTime], [checkOutTime], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (21, 2, CAST(N'2025-03-27' AS Date), CAST(N'11:39:22' AS Time), NULL, NULL, NULL, CAST(N'2025-03-27T11:39:22.610' AS DateTime), 1, 1)
INSERT [dbo].[tblAttendance] ([Id], [userId], [date], [checkInTime], [checkOutTime], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (22, 4, CAST(N'2025-03-27' AS Date), CAST(N'11:57:34' AS Time), NULL, NULL, NULL, CAST(N'2025-03-27T11:57:34.657' AS DateTime), 1, 1)
INSERT [dbo].[tblAttendance] ([Id], [userId], [date], [checkInTime], [checkOutTime], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (25, 1, CAST(N'2025-03-27' AS Date), CAST(N'12:06:24' AS Time), NULL, NULL, NULL, CAST(N'2025-03-27T12:06:24.187' AS DateTime), 1, 1)
INSERT [dbo].[tblAttendance] ([Id], [userId], [date], [checkInTime], [checkOutTime], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (26, 1, CAST(N'2025-04-02' AS Date), CAST(N'10:45:58' AS Time), NULL, NULL, NULL, CAST(N'2025-04-02T10:45:58.230' AS DateTime), 1, 1)
SET IDENTITY_INSERT [dbo].[tblAttendance] OFF
GO
SET IDENTITY_INSERT [dbo].[tblImageId] ON 

INSERT [dbo].[tblImageId] ([Id], [userId], [imageId], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (1, 1, N'1_a', NULL, NULL, CAST(N'2024-11-12T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblImageId] ([Id], [userId], [imageId], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (2, 1, N'1_b', NULL, NULL, CAST(N'2024-11-12T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblImageId] ([Id], [userId], [imageId], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (3, 1, N'1_c', NULL, NULL, CAST(N'2024-11-12T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblImageId] ([Id], [userId], [imageId], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (4, 1, N'1_d', NULL, NULL, CAST(N'2024-11-12T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblImageId] ([Id], [userId], [imageId], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (5, 1, N'1_e', NULL, NULL, CAST(N'2024-11-12T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblImageId] ([Id], [userId], [imageId], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (6, 2, N'2_a', NULL, NULL, CAST(N'2024-11-12T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblImageId] ([Id], [userId], [imageId], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (7, 2, N'2_b', NULL, NULL, CAST(N'2024-11-12T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblImageId] ([Id], [userId], [imageId], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (8, 2, N'2_c', NULL, NULL, CAST(N'2024-11-12T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblImageId] ([Id], [userId], [imageId], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (9, 2, N'2_d', NULL, NULL, CAST(N'2024-11-12T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblImageId] ([Id], [userId], [imageId], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (10, 2, N'2_e', NULL, NULL, CAST(N'2024-11-12T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblImageId] ([Id], [userId], [imageId], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (11, 3, N'3_a', NULL, NULL, CAST(N'2024-11-12T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblImageId] ([Id], [userId], [imageId], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (12, 3, N'3_b', NULL, NULL, CAST(N'2024-11-12T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblImageId] ([Id], [userId], [imageId], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (13, 3, N'3_c', NULL, NULL, CAST(N'2024-11-12T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblImageId] ([Id], [userId], [imageId], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (14, 3, N'3_d', NULL, NULL, CAST(N'2024-11-12T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblImageId] ([Id], [userId], [imageId], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (15, 3, N'3_e', NULL, NULL, CAST(N'2024-11-12T00:00:00.000' AS DateTime), 1, 1)
SET IDENTITY_INSERT [dbo].[tblImageId] OFF
GO
SET IDENTITY_INSERT [dbo].[tblResource] ON 

INSERT [dbo].[tblResource] ([Id], [resourceTypeId], [brand], [price], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (1, 1, N'HP', CAST(18000.00 AS Decimal(18, 2)), CAST(N'2025-01-02T12:49:41.223' AS DateTime), 2, CAST(N'2024-11-10T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblResource] ([Id], [resourceTypeId], [brand], [price], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (2, 2, N'Med', CAST(6000.00 AS Decimal(18, 2)), NULL, NULL, CAST(N'2024-11-10T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblResource] ([Id], [resourceTypeId], [brand], [price], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (3, 1, N'DELL', CAST(21000.99 AS Decimal(18, 2)), NULL, NULL, CAST(N'2025-01-02T12:49:11.520' AS DateTime), 2, 1)
SET IDENTITY_INSERT [dbo].[tblResource] OFF
GO
SET IDENTITY_INSERT [dbo].[tblResourceType] ON 

INSERT [dbo].[tblResourceType] ([Id], [resourceType], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (1, N'monitor', NULL, NULL, CAST(N'2024-11-10T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblResourceType] ([Id], [resourceType], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (2, N'ppeKit', NULL, NULL, CAST(N'2024-11-10T00:00:00.000' AS DateTime), 1, 1)
SET IDENTITY_INSERT [dbo].[tblResourceType] OFF
GO
SET IDENTITY_INSERT [dbo].[tblRole] ON 

INSERT [dbo].[tblRole] ([Id], [description], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (1, N'Admin', NULL, NULL, CAST(N'2024-11-10T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblRole] ([Id], [description], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (2, N'Lab Assistant', NULL, NULL, CAST(N'2024-11-10T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblRole] ([Id], [description], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (3, N'Researcher', NULL, NULL, CAST(N'2025-01-05T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblRole] ([Id], [description], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (4, N'Scientist', NULL, NULL, CAST(N'2025-01-05T00:00:00.000' AS DateTime), 1, 1)
SET IDENTITY_INSERT [dbo].[tblRole] OFF
GO
SET IDENTITY_INSERT [dbo].[tblUser] ON 

INSERT [dbo].[tblUser] ([Id], [roleId], [firstName], [lastName], [email], [password], [nic], [addressLine1], [addressLine2], [city], [contactNo], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (1, 1, N'Peter', N'Jackson', N'peterjakson1@gmail.com', N'13exMLITzkCRxzmsnGGJHpEWPQJPzg', N'200007894513', N'877, Somer Road', NULL, N'Wellington', 714085565, CAST(N'2025-01-02T11:42:12.330' AS DateTime), 2, CAST(N'2024-11-10T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblUser] ([Id], [roleId], [firstName], [lastName], [email], [password], [nic], [addressLine1], [addressLine2], [city], [contactNo], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (2, 2, N'Leonardo', N'Dicaprio', N'leodicap25@gmail.com', N'7Rg4GmGrDcLMjA4IzlJLvVDaOm/mAe', N'20008946587', N'12, Palace Road', NULL, N'London', 717894562, NULL, NULL, CAST(N'2024-11-10T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblUser] ([Id], [roleId], [firstName], [lastName], [email], [password], [nic], [addressLine1], [addressLine2], [city], [contactNo], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (3, 3, N'Will', N'Smith', N'willsmith57@gmail.com', N'Pm3zPB2OyPm//ueeOBFq7NDFRDI2wK', N'19997894562', N'35, Church Road', NULL, N'New York', 778945612, NULL, NULL, CAST(N'2024-11-10T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblUser] ([Id], [roleId], [firstName], [lastName], [email], [password], [nic], [addressLine1], [addressLine2], [city], [contactNo], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (4, 1, N'Dale', N'Steyn', N'steyngun8@gmail.com', N'XX5xNRbQYa8PXeSxt9owuJxUO2xgAH', N'20027894562', N'11, Temple Road', N'Downtown', N'Pretoria                 ', 754561238, CAST(N'2025-03-15T17:08:56.750' AS DateTime), 4, CAST(N'2024-11-10T00:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[tblUser] ([Id], [roleId], [firstName], [lastName], [email], [password], [nic], [addressLine1], [addressLine2], [city], [contactNo], [updateDate], [updateBy], [insertDate], [insertBy], [isActive]) VALUES (5, 4, N'John', N'Doe', N'johndoe@gmail.com', N'+8+SkZtIGwtuN5UqPkJNnhIV7tU3Fk', N'19994561238', N'21 Jump Street', NULL, N'Colombo                  ', 751234568, NULL, NULL, CAST(N'2025-01-02T11:51:27.133' AS DateTime), 2, 1)
SET IDENTITY_INSERT [dbo].[tblUser] OFF
GO
ALTER TABLE [dbo].[tblAttendance]  WITH CHECK ADD  CONSTRAINT [FK_tblAttendance_tblUser] FOREIGN KEY([userId])
REFERENCES [dbo].[tblUser] ([Id])
GO
ALTER TABLE [dbo].[tblAttendance] CHECK CONSTRAINT [FK_tblAttendance_tblUser]
GO
ALTER TABLE [dbo].[tblImageId]  WITH CHECK ADD  CONSTRAINT [FK_tblImageId_tblImageId] FOREIGN KEY([userId])
REFERENCES [dbo].[tblUser] ([Id])
GO
ALTER TABLE [dbo].[tblImageId] CHECK CONSTRAINT [FK_tblImageId_tblImageId]
GO
ALTER TABLE [dbo].[tblResource]  WITH CHECK ADD  CONSTRAINT [FK_tblResource_tblResourceType] FOREIGN KEY([resourceTypeId])
REFERENCES [dbo].[tblResourceType] ([Id])
GO
ALTER TABLE [dbo].[tblResource] CHECK CONSTRAINT [FK_tblResource_tblResourceType]
GO
ALTER TABLE [dbo].[tblUser]  WITH CHECK ADD  CONSTRAINT [FK_tblUser_tblRole] FOREIGN KEY([roleId])
REFERENCES [dbo].[tblRole] ([Id])
GO
ALTER TABLE [dbo].[tblUser] CHECK CONSTRAINT [FK_tblUser_tblRole]
GO
/****** Object:  StoredProcedure [dbo].[checkPassword]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[checkPassword]
    @currentPassword NVARCHAR(30),
    @userId int
AS
BEGIN
    -- Declare a variable to store the password from the database
    DECLARE @dbPassword NVARCHAR(30);

    -- Get the password from tblEmployee where the email matches
    SELECT @dbPassword = Password
    FROM tblUser
    WHERE Id = @userId and isActive = 1;

    -- Check if the password from the database matches the current password
    IF trim(@dbPassword) = trim(@currentPassword)
    BEGIN
        -- If passwords match, return 'EQUAL'
        SELECT 'EQUAL' AS Result;
    END
    ELSE
    BEGIN
        -- If passwords do not match, you can return a different message (optional)
        SELECT 'NOT EQUAL' AS Result;
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[getAllResources]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[getAllResources]

as

begin
	select r.Id, rt.resourceType, r.brand, r.price, r.insertDate
	from tblResource r
	inner join tblResourceType rt on r.resourceTypeId = rt.Id
	where r.isActive = 1
end
GO
/****** Object:  StoredProcedure [dbo].[getAllResourceTypes]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[getAllResourceTypes]
as
begin
select r.Id, r.resourceType
from tblResourceType r
where r.isActive = 1
end
GO
/****** Object:  StoredProcedure [dbo].[getAllRoles]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[getAllRoles]

as
begin
	select r.Id, trim(r.description) as role
	from tblRole r
	where r.isActive = 1
end
GO
/****** Object:  StoredProcedure [dbo].[getAllUsers]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getAllUsers]

AS
BEGIN
    SELECT
        u.Id,
        trim(u.firstName) + ' ' +  trim(u.lastName) as name,
        trim(r.description) AS role,
        trim(u.firstName) as firstName,
        trim(u.lastName) as lastName,
        trim(u.email) as email,
        u.password,
        trim(u.nic) as nic,
		u.contactNo,
        trim(u.addressLine1) as addressLine1,
        trim(u.addressLine2) as addressLine2,
        TRIM(u.city) AS city,
		TRIM(u.addressLine1) 
		+ IIF(u.addressLine2 IS NOT NULL, ', ' + TRIM(u.addressLine2), '') 
		+ ', ' 
		+ TRIM(u.city)  
		AS address

    FROM
        tblUser u
    INNER JOIN
        tblRole r ON r.Id = u.roleId
  
    WHERE
        u.isActive = 1
	ORDER BY u.Id;
END
GO
/****** Object:  StoredProcedure [dbo].[getAnnouncement]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getAnnouncement]
AS
BEGIN
    SELECT a.Id, a.description, a.isToAll, a.insertDate
    FROM tblAnnouncement a
    WHERE a.isActive = 1;
END
GO
/****** Object:  StoredProcedure [dbo].[getAttendance]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getAttendance]
@userId INT
AS
BEGIN
    SELECT a.Id, a.userId, u.firstName, u.lastName, a.date, a.checkInTime, a.checkOutTime 
    FROM tblAttendance a
    INNER JOIN tblUser u ON a.userId = u.Id
    WHERE a.userId = @userId and a.isActive = 1;
END
GO
/****** Object:  StoredProcedure [dbo].[getOccupancy]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getOccupancy]

as
begin
	select a.Id, a.userId, u.firstName, u.lastName, r.description as role, a.date, a.checkInTime
	from tblAttendance a
	inner join tblUser u on u.Id = a.userId
	inner join tblRole r on r.Id = u.roleId
	where a.checkOutTime is null and a.checkInTime is not null and a.date = CAST(GETDATE() AS DATE);
end
GO
/****** Object:  StoredProcedure [dbo].[getResourceDetails]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[getResourceDetails]
@resourceId int

as

begin
	select r.Id, rt.resourceType, r.brand, r.price
	from tblResource r
	inner join tblResourceType rt on r.resourceTypeId = rt.Id
	where r.Id = @resourceId  and r.isActive = 1
end
GO
/****** Object:  StoredProcedure [dbo].[getResourceTypeDetails]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[getResourceTypeDetails]
@resourceTypeId int

as

begin
select r.Id, r.resourceType
from tblResourceType r
where r.Id = @resourceTypeId and r.isActive = 1
end
GO
/****** Object:  StoredProcedure [dbo].[getRoleDetails]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[getRoleDetails]
@roleId int
as

begin
select r.Id, r.description as Role
from tblRole r
where r.Id = @roleId and r.isActive = 1
end
GO
/****** Object:  StoredProcedure [dbo].[getUser]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getUser]
@userId int
AS
BEGIN
    SELECT
        u.Id,       
        r.description AS role,
        u.firstName,
        u.lastName,
        u.email,
        u.password,
        u.nic,
        u.addressLine1,
        u.addressLine2,
        TRIM(u.city) AS city,
        u.contactNo
    FROM
        tblUser u
    INNER JOIN
        tblRole r ON r.Id = u.roleId
	WHERE
        u.Id = @userId AND u.isActive = 1;
END
GO
/****** Object:  StoredProcedure [dbo].[getUserAttendanceCount]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[getUserAttendanceCount]
    @userId INT
AS
BEGIN
    SELECT COUNT(*) AS AttendanceCount
    FROM tblAttendance a
    WHERE a.userId = @userId;
END;
GO
/****** Object:  StoredProcedure [dbo].[insertAnnouncement]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[insertAnnouncement]

@description VARCHAR(255),
@isToAll INT,
@insertBy INT
AS
BEGIN
    INSERT INTO tblAnnouncement 
    VALUES (@description, @isToAll, NULL, NULL, GETDATE(), @insertBy, 1);
END
GO
/****** Object:  StoredProcedure [dbo].[insertNewResource]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[insertNewResource]
    
	@resourceType varchar(50), 
	@brand varchar(50), 
	@price decimal(18, 2),
	@insertBy int
AS
BEGIN
    -- Start a transaction to ensure atomicity
    BEGIN TRANSACTION;

    -- Declare variables to hold the TypeIDs
   
	DECLARE @resourceTypeId INT;

    -- Retrieve the resourceTypeID based on the resourceTypeName
    SELECT @resourceTypeId = Id
    FROM tblResourceType
    WHERE trim(resourceType) = trim(@resourceType);

    IF @resourceTypeId IS NULL
    BEGIN
        -- Handle the case where the resource type name does not exist
        RAISERROR('Resource type not found', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

    -- Insert into resourse table
    insert into tblResource values (@resourceTypeId, @brand, @price, null, null, getdate(), @insertBy, 1)

  
    -- Commit the transaction if everything is successful
    COMMIT TRANSACTION;

    -- Optionally, return the new PayrollID or a success message
    SELECT 'Resource data inserted successfully' AS Message;

END;
GO
/****** Object:  StoredProcedure [dbo].[insertNewUser]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[insertNewUser]
  
	@role varchar(25), 
	@firstName varchar(25),
	@lastName varchar(25),
	@email varchar(50),
	@password nvarchar(30),
	@nic varchar(20),
	@addressLine1 nvarchar(255),
	@addressLine2 nvarchar(255),
	@city char(25),
	@contactNo bigint,
	@insertBy int
AS
BEGIN
    -- Start a transaction to ensure atomicity
    BEGIN TRANSACTION;

    -- Declare variables to hold the new IDs and TypeIDs
   
	DECLARE @roleId INT;

	SELECT @roleId = Id
    FROM tblRole
    WHERE trim(description) = trim(@role);

    IF @roleId IS NULL
    BEGIN
        RAISERROR('Role not found', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

	-- Parse the reportPerson into firstName and lastName
        DECLARE @first varchar(25), @last varchar(25);
      
    -- Insert into user table
    insert into tblUser values (@roleId, @firstName, @lastName, @email, @password, @nic, @addressLine1, @addressLine2,
	@city, @contactNo, null, null, getdate(), @insertBy, 1)

    -- Commit the transaction if everything is successful
    COMMIT TRANSACTION;

    -- Optionally, return the new PayrollID or a success message
    SELECT 'user data inserted successfully' AS Message;

END;
GO
/****** Object:  StoredProcedure [dbo].[insertResourceType]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[insertResourceType]
@resourceType varchar(50),
@insertBy int

as

begin
	insert into tblResourceType values (@resourceType, null, null, getdate(), @insertBy, 1)
	
end
GO
/****** Object:  StoredProcedure [dbo].[insertRole]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[insertRole]
@description varchar(25),
@insertBy int

as

begin
	insert into tblRole values (@description, null, null, getdate(), @insertBy, 1)
	
end
GO
/****** Object:  StoredProcedure [dbo].[logInUser]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[logInUser]
@email varchar(50),
@password nvarchar(30)
as
begin
if(select u.Id from tblUser u where u.email = @email and u.password = @password) is not null
begin
select u.Id, trim(u.firstName) + ' ' + trim(u.lastName) as name, trim(r.description) as role, u.email
from tblUser u
inner join tblRole r on r.Id = u.roleId
where u.email = @email and u.password = @password and u.isActive = 1
and u.isActive = 1 and r.isActive = 1
end
end
GO
/****** Object:  StoredProcedure [dbo].[updateAnnouncement]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateAnnouncement]
@Id INT,
@description VARCHAR(255),
@isToAll INT,
@updateBy INT
AS
BEGIN
    UPDATE tblAnnouncement
    SET 
        description = @description,
        isToAll = @isToAll,
        updateDate = GETDATE(),
        updateBy = @updateBy
    WHERE Id = @Id and isActive = 1;
END
GO
/****** Object:  StoredProcedure [dbo].[updateAttendance]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateAttendance]
@Id INT,
@userId INT,
@date DATE,
@checkInTime TIME(3),
@checkOutTime TIME(3),
@updateBy INT
AS
BEGIN
    UPDATE tblAttendance
    SET userId = @userId,
        date = @date,
        checkInTime = @checkInTime,
        checkOutTime = @checkOutTime,
        updateDate = GETDATE(),
        updateBy = @updateBy
    WHERE Id = @Id and isActive = 1;
END
GO
/****** Object:  StoredProcedure [dbo].[updatePassword]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[updatePassword]
	@currentPassword nvarchar(30),
	@newPassword nvarchar(30),
	@Id int
as
begin
	UPDATE tblUser
    SET password = @newPassword
    WHERE Id = @Id and password = @currentPassword
end
GO
/****** Object:  StoredProcedure [dbo].[updateResourceDetails]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateResourceDetails]
    
    @resourceType varchar(50),  
    @brand varchar(50),
	@price decimal(18, 2),
    @updateBy int,
    @resourceId int
AS
BEGIN
    -- Start a transaction to ensure atomicity
    BEGIN TRANSACTION;

    -- Declare variables to hold the new IDs and TypeIDs
    DECLARE @resourceTypeId INT;

    -- Retrieve the resourceTypeID based on the resourceTypeName
    SELECT @resourceTypeId = Id
    FROM tblResourceType
    WHERE LTRIM(RTRIM(resourceType)) = LTRIM(RTRIM(@resourceType));

    IF @resourceTypeId IS NULL
    BEGIN
        -- Handle the case where the resource type name does not exist
        RAISERROR('Resource type not found', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

  
    -- Update tblResource table
    UPDATE tblResource 
    SET 
        resourceTypeId = @resourceTypeId,    
		brand = @brand, 
        price = @price,
        updateDate = GETDATE(), 
        updateBy = @updateBy
    WHERE Id = @resourceId AND isActive = 1;

    

    -- Commit the transaction if everything is successful
    COMMIT TRANSACTION;

    -- Optionally, return a success message
    SELECT 'Resource data updated successfully' AS Message;

END;
GO
/****** Object:  StoredProcedure [dbo].[updateResourceType]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[updateResourceType]
@resourceType varchar(50),
@updateBy int,
@resourceTypeId int

as

begin
	update tblResourceType set resourceType = @resourceType, updateDate = getdate(), updateBy = @updateBy
	where Id = @resourceTypeId and isActive = 1
	
end
GO
/****** Object:  StoredProcedure [dbo].[updateRole]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[updateRole]
@description varchar(25), 
@updateBy int,
@roleId int

as

begin
	update tblRole set description = @description, updateDate = getdate(), updateBy = @updateBy
	where Id = @roleId and isActive = 1
end
GO
/****** Object:  StoredProcedure [dbo].[updateUser]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateUser]

@role varchar(25), 
@firstName VARCHAR(25),
@lastName VARCHAR(25),
@email VARCHAR(50),
@nic VARCHAR(20),
@addressLine1 NVARCHAR(255),
@addressLine2 NVARCHAR(255),
@city CHAR(25),
@contactNo BIGINT,
@updateBy INT,
@recordId int
AS
BEGIN

 -- Start a transaction to ensure atomicity
    BEGIN TRANSACTION;

    -- Declare variables to hold the new IDs and TypeIDs
   
	DECLARE @roleId INT;

	SELECT @roleId = Id
    FROM tblRole
    WHERE trim(description) = trim(@role);

    IF @roleId IS NULL
    BEGIN
        RAISERROR('Role not found', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

    UPDATE tblUser
    SET 
        roleId = @roleId,
        firstName = @firstName,
        lastName = @lastName,
        email = @email,
        nic = @nic,
        addressLine1 = @addressLine1,
        addressLine2 = @addressLine2,
        city = @city,
        contactNo = @contactNo,
        updateDate = GETDATE(),
        updateBy = @updateBy
    WHERE Id = @recordId and isActive = 1;

    -- Commit the transaction if everything is successful
    COMMIT TRANSACTION;

    -- Optionally, return the new PayrollID or a success message
    SELECT 'user data updated successfully' AS Message;

END;
GO
/****** Object:  StoredProcedure [dbo].[verifyLogin]    Script Date: 5/5/2025 2:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[verifyLogin]
@email VARCHAR(50),
@password NVARCHAR(30)
AS 
BEGIN
SELECT Id FROM tblUser WHERE email = @email AND password = @password AND isActive = 1
END
GO
