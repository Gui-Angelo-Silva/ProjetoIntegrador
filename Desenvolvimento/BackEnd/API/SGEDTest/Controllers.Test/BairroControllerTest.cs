using Microsoft.AspNetCore.Mvc;
using Moq;
using SGED.Controllers;
using SGED.Objects.DTO.Entities;
using SGED.Services.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace SGEDTest.Controllers.Test
{
	[TestFixture]
	public class BairroControllerTest
	{
		private Mock<IBairroService> _bairroServiceMock;
		private BairroController _bairroController;

		[SetUp]
		public void Setup()
		{
			_bairroServiceMock = new Mock<IBairroService>();
			_bairroController = new BairroController(_bairroServiceMock.Object);
		}

		[Test]
		public async Task Obter_TodosBairrosRetornadosComOk()
		{
			var bairro = new List<BairroDTO> { new BairroDTO { Id = 1, NomeBairro = "Residencial São Lucas", IdCidade = 1 } };
			_bairroServiceMock.Setup(service => service.GetAll()).ReturnsAsync(bairro);

			var result = await _bairroController.Get();

			var okResult = result.Result as OkObjectResult;
			Assert.IsNotNull(okResult);
			Assert.That(okResult.StatusCode, Is.EqualTo(200));
		}
	}
}
