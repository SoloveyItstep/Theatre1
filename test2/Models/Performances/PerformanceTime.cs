using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace test2.Models.Performances
{
    public class PerformanceTime
    {
        [Key]
        public Guid Id { get; set; }

        public DateTime Time { get; set; }

        public Guid PerformanceDateId { get; set; }

        public Decimal Price { get; set; }

        public virtual ICollection<Orders> Orders { get; set; }

        //[JsonIgnore]
        //public virtual PerformanceDate PerformanceDate { get; set; }
    }
}
