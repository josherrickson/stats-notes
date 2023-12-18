SRC_DIR = files
DEST_DIR = docs

HTML_FILES := $(wildcard $(SRC_DIR)/*.html)
HTML_DEST_FILES := $(patsubst $(SRC_DIR)/%.html, $(DEST_DIR)/%.html, $(HTML_FILES))

.PHONY: all
all: $(HTML_DEST_FILES)

$(DEST_DIR)/%.html: $(SRC_DIR)/%.html header.html footer.html
	mkdir -p docs
	cat header.html $< footer.html > $@

.PHONY: clean
clean:
	rm -rf $(DEST_DIR)
