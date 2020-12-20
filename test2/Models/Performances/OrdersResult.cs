using System;

namespace test2.Models.Performances
{
    public class OrdersResult
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Time { get; set; }
        public decimal Price { get; set; }
        public int Count { get; set; }
    }
}
