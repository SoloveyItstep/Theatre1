using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using test2.Helpers;
using test2.Models.Performances;

namespace test2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    
    public class UserController : ControllerBase
    {
        readonly IPerformanceHelper helper;

        public UserController(IPerformanceHelper helper)
        {
            this.helper = helper;
        }

        [Route("getorders"), HttpPost]
        [Authorize]
        public async Task<List<OrdersResult>> GetUserOrders()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await helper.GetUserBookedPerformances(userId).ConfigureAwait(false);
        }
    }
}
