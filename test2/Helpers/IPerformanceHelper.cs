using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using test2.Models.Performances;

namespace test2.Helpers
{
    public interface IPerformanceHelper
    {
        Task<List<Performance>> GetPerformances(Int32 page, Int32 count, DateTime? date, String name);
        Task<List<Performance>> GetAll();
        Task<Int32> GetTotal(DateTime? date, String name);
        Task<Performance> GetPerformance(Guid id);
        Task Book(string timeId, int count, string userId);
        Task<Boolean> Edit(Performance performance);
        Task<List<OrdersResult>> GetUserBookedPerformances(string id);
    }
}
