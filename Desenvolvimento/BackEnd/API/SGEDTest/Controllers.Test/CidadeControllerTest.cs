using Microsoft.AspNetCore.Mvc;
using Moq;
using SGED.Controllers;
using SGED.Objects.DTO.Entities;
using SGED.Services.Interfaces;

namespace SGEDTest.Controllers.Test
{
	[TestFixture]
	public class CidadeControllerTest
	{
		private Mock<ICidadeService> _cidadeServiceMock;
		private CidadeController _cidadeController;

		[SetUp]
		public void Setup()
		{
			_cidadeServiceMock = new Mock<ICidadeService>();
			_cidadeController = new CidadeController(_cidadeServiceMock.Object);
		}


	}
}