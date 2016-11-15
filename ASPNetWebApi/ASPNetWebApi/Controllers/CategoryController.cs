using ASPNetWebApi.Models;
using ASPNetWebApi.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ASPNetWebApi.Controllers
{
    public class CategoryController : ApiController
    {
        public List<CategoryViewModel> Get()
        {
            MyContext db = new MyContext();
            return db.Categories.Select(x => new CategoryViewModel()
            {
                CategoryID = x.CategoryID,
                CategoryName = x.CategoryName,
                Description = x.Description,
                Picture = x.Picture
            }).ToList();
        }
        public CategoryViewModel Get(int id)
        {
            MyContext db = new MyContext();
            var category = db.Categories.Find(id);
            if (category == null)
                return null;
            CategoryViewModel model = new CategoryViewModel()
            {
                CategoryID = category.CategoryID,
                CategoryName = category.CategoryName,
                Description = category.Description,
                Picture = category.Picture
            };
            return model;
        }
        public object Post([FromBody]CategoryViewModel value)
        {
            MyContext db = new MyContext();
            try
            {
                db.Categories.Add(new Category()
                {
                     CategoryName=value.CategoryName,
                      Description=value.Description
                });
                db.SaveChanges();
                return new
                {
                    success=true,
                    message="Kategori ekleme işlemi başarılı"
                };
            }
            catch (Exception ex)
            {
                return new
                {
                    success = false,
                    message = $"Kategori ekleme işlemi başarısız. {ex.Message}"
                };
            }
        }
        public object Put([FromBody]CategoryViewModel value)
        {
            MyContext db = new MyContext();
            try
            {
                var kategori = db.Categories.Find(value.CategoryID);
                kategori.CategoryName = value.CategoryName;
                kategori.Description = value.Description;
                db.SaveChanges();
                return new
                {
                    success = true,
                    message = "Kategori güncelleme işlemi başarılı"
                };
            }
            catch (Exception ex)
            {
                return new
                {
                    success = false,
                    message = $"Kategori güncelleme işlemi başarısız. {ex.Message}"
                };
            }
        }
        public string Delete(int id)
        {
            MyContext db = new MyContext();
            try
            {
                var kategori= db.Categories.Find(id);
                if (kategori == null)
                    throw new Exception("Silinecek Kategori Bulunamadı");
                db.Categories.Remove(kategori);
                db.SaveChanges();
                return $"{kategori.CategoryName} isimli kategori silinmiştir";
            }
            catch (Exception ex)
            {
                return $"Kategori silme işleminde hata: {ex.Message}";
            }
            
        }
    }
}
