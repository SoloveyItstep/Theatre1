using LinqKit;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using test2.Data;
using test2.Models.Performances;

namespace test2.Services
{
    public class PerformanceService: IPerformanceService
    {
        private readonly PerformanceDbContext context;
        public PerformanceService(PerformanceDbContext context)
        {
            this.context = context;
        }

        public async Task<int> Book(Guid timeId, int count, Guid userId)
        {
            var order = await context.Orders.FirstOrDefaultAsync(x => x.PerformanceTimeId == timeId && x.UserId == userId).ConfigureAwait(false);
            if (order != null)
            {
                order.Count += count;
                context.Orders.Update(order);
            }
            else
            {
                context.Orders.Add(new Orders
                {
                    Count = count,
                    PerformanceTimeId = timeId,
                    UserId = userId
                });
            }
            return await context.SaveChangesAsync().ConfigureAwait(false);
        }

        public async Task<Int32> Edit(Performance performance)
        {
            context.Update(performance);
            return await context.SaveChangesAsync();
        }

        public Task<List<Performance>> GetAll()
        {
            return context.Performances.AsNoTracking().Include(x => x.PerformanceDates).ToListAsync();
        }

        public Task<Performance> GetPerformance(Guid id)
        {
            return context.Performances
                .Include(x => x.PerformanceDates)
                .ThenInclude(x => x.PerformanceTimes)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public Task<List<Performance>> GetPerformances(int page, int count, DateTime date, string name)
        {
            var condition = GetPredicate(date, name);
            return Find(page, count, condition);
        }

        public Task<List<Performance>> GetPerformances(int page, int count, DateTime date)
        {
            return Find(page, count,
                (x) => x.PerformanceDates
                        .FirstOrDefault(dt =>
                                dt.Date.Year == date.Year &&
                                dt.Date.Month == date.Month &&
                                dt.Date.Day == date.Day)
                        != null);
        }

        public async Task<List<Performance>> GetPerformances(int page, int count)
        {
            return await context.Performances.AsNoTracking()
                .Include(x => x.PerformanceDates)
                .Skip((page - 1) * count).Take(count)
                .ToListAsync();
        }

        public Task<List<Performance>> GetPerformances(int page, int count, string name)
        {
            return Find(page, count,(x) => x.Name.Contains(name));
        }

        public Task<int> GetTotal()
        {
            return FindTotal(x => x != null);
        }

        public Task<int> GetTotal(DateTime date, string name)
        {
            var condition = GetPredicate(date, name);
            return FindTotal(condition);
        }

        public Task<int> GetTotal(string name)
        {
            return FindTotal(x => x.Name.Contains(name));
        }

        public Task<int> GetTotal(DateTime date)
        {
            return FindTotal(x => x.PerformanceDates
                        .FirstOrDefault(dt =>
                                dt.Date.Year == date.Year &&
                                dt.Date.Month == date.Month &&
                                dt.Date.Day == date.Day)
                        != null);
        }

        public async Task<List<OrdersResult>> GetUserBookedPerformances(string id)
        {
            List<OrdersResult> result = new List<OrdersResult>();
            var performances = await context.Performances.ToListAsync().ConfigureAwait(false);
            var dates = await context.PerformanceDates.ToListAsync().ConfigureAwait(false);
            var times = await context.PerformanceTimes.ToListAsync().ConfigureAwait(false);
            var orders = await context.Orders.Where(x => x.UserId == Guid.Parse(id)).ToListAsync().ConfigureAwait(false);

            performances.AsParallel().ForAll(x => {
                var timesTmp = times.Where(t => orders.Any(o => o.PerformanceTimeId == t.Id)).ToList();
                var datesTmp = dates.Where(d => timesTmp.Any(t => t.PerformanceDateId == d.Id)).ToList();
                x.PerformanceDates = datesTmp.Where(d => d.PerformanceId == x.Id).ToList();
                if (x.PerformanceDates.Count() > 0)
                {
                    foreach (var date in x.PerformanceDates)
                    {
                        foreach (var time in date.PerformanceTimes)
                        {
                            result.Add(new OrdersResult
                            {
                                Id = x.Id,
                                Title = x.Name,
                                Time = new DateTime(date.Date.Year, date.Date.Month, date.Date.Day, time.Time.Hour, time.Time.Minute, time.Time.Second),
                                Price = time.Price,
                                Count = orders.First(o => o.PerformanceTimeId == time.Id).Count
                            });
                        }
                    }   
                }
            });


            return result;
        }

        private Task<List<Performance>> Find(Int32 page, Int32 count, Expression<Func<Performance, Boolean>> predicate)
        {
            return context.Performances.Where(predicate)
                .Skip((page - 1) * count)
                .Take(count)
                .ToListAsync();
        }

        private Task<Int32> FindTotal(Expression<Func<Performance, Boolean>> predicate)
        {
            return context.Performances.Where(predicate).CountAsync();
        }

        private ExpressionStarter<Performance> GetPredicate(DateTime date, String name)
        {
            var condition = PredicateBuilder.New<Performance>(true);
            condition = context.Performances.Aggregate(condition,
                (current, value) => condition.And(x => x.Name.Contains(name))
                                .And(x => x.PerformanceDates
                    .FirstOrDefault(dt =>
                            dt.Date.Year == date.Year &&
                            dt.Date.Month == date.Month &&
                            dt.Date.Day == date.Day)
                    != null).Expand());
            return condition;
        }
    }
}
