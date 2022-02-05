package crud

import (
	"errors"
	"time"

	"backend/api/models"
	"backend/api/utils/channels"

	"github.com/jinzhu/gorm"
)

// RepositoryPostsCRUD is the struct for the Post CRUD
type RepositoryPostsCRUD struct {
	db *gorm.DB
}

// NewRepositoryPostsCRUD returns a new repository with DB connection
func NewRepositoryPostsCRUD(db *gorm.DB) *RepositoryPostsCRUD {
	return &RepositoryPostsCRUD{db}
}

// Save returns a new post created or an error
func (r *RepositoryPostsCRUD) Save(post models.Post) (models.Post, error) {
	var err error
	done := make(chan bool)
	go func(ch chan<- bool) {
		defer close(ch)
		err = r.db.Debug().Model(&models.Post{}).Create(&post).Related(&post.Author, "author_id").Error
		if err != nil {
			ch <- false
			return
		}
		ch <- true
	}(done)
	if channels.OK(done) {
		return post, nil
	}
	return models.Post{}, err
}

// FindAll returns all the posts from the DB
func (r *RepositoryPostsCRUD) FindAll(authorid uint64) ([]models.Post, error) {
	var err error
	posts := []models.Post{}
	done := make(chan bool)
	go func(ch chan<- bool) {
		defer close(ch)

		err = r.db.Debug().Select([]string{"id", "title", "content"}).Where("author_id = ?", authorid).Limit(100).Find(&posts).Error
		// err = r.db.Debug().Raw("SELECT id, title, content, author_id FROM posts where author_id=? limit 100", strconv.FormatUint(authorid, 10)).Scan(&posts).Error

		if err != nil {
			ch <- false
			return
		}

		ch <- true
	}(done)
	if channels.OK(done) {
		return posts, nil
	}
	return posts, err
}

// FindByID returns a post from the DB
func (r *RepositoryPostsCRUD) FindByID(pid uint32) (models.Post, error) {
	var err error
	post := models.Post{}
	done := make(chan bool)
	go func(ch chan<- bool) {
		defer close(ch)
		err = r.db.Debug().Preload("Author").Find(&post, pid).Error
		if err != nil {
			ch <- false
			return
		}
		ch <- true
	}(done)
	if channels.OK(done) {
		return post, nil
	}

	if gorm.IsRecordNotFoundError(err) {
		return models.Post{}, errors.New("Post Not Found")
	}
	return models.Post{}, err
}

// Update updates a post from the DB
func (r *RepositoryPostsCRUD) Update(pid uint32, post models.Post) (int64, error) {
	var rs *gorm.DB
	done := make(chan bool)
	go func(ch chan<- bool) {
		defer close(ch)
		rs = r.db.Debug().Model(&models.Post{}).Where("id = ?", pid).Take(&models.Post{}).UpdateColumns(
			map[string]interface{}{
				"title":      post.Title,
				"content":    post.Content,
				"updated_at": time.Now(),
			},
		)
		ch <- true
	}(done)

	if channels.OK(done) {
		if rs.Error != nil {
			return 0, rs.Error
		}

		return rs.RowsAffected, nil
	}
	return 0, rs.Error
}

// Delete removes a post from the DB
func (r *RepositoryPostsCRUD) Delete(pid uint32, authorid uint64) (int64, error) {
	var rs *gorm.DB
	done := make(chan bool)
	go func(ch chan<- bool) {
		defer close(ch)
		rs = r.db.Debug().Model(&models.Post{}).Where("id = ? and author_id = ?", pid, authorid).Take(&models.Post{}).Delete(&models.Post{})
		ch <- true
	}(done)

	if channels.OK(done) {
		if rs.Error != nil {
			return 0, rs.Error
		}

		return rs.RowsAffected, nil
	}
	return 0, rs.Error
}
