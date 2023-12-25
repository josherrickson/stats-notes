SRC_DIR = files
DEST_DIR = docs

HTML_FILES := $(wildcard $(SRC_DIR)/*.html)
HTML_DEST_FILES := $(patsubst $(SRC_DIR)/%.html, $(DEST_DIR)/%.html, $(HTML_FILES))

.PHONY: all
all: $(HTML_DEST_FILES) copy_files docs/index.html docs/responsesurfaceplot.html

docs/index.html: index.html header.html
	mkdir -p docs
	cp header.html header-tmp.html
	sed -i '' -e 's_TITLE_JE Statisics Notes_' header-tmp.html
	cat header-tmp.html index.html > $@
	rm header-tmp.html

$(DEST_DIR)/%.html: $(SRC_DIR)/%.html header.html footer.html
	mkdir -p docs
	cp header.html header-tmp.html
	cp $< tmp.html
	$(eval TITLE := $(shell sed -n '/<h1[^>]*>\(.*\)<\/h1>/s//\1/p' $< | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$$//' | sed 's/<\/code>//g; s/<code>//g'))
	echo $(info $$TITLE is [${TITLE}])
	sed -i '' -e 's_TITLE_$(TITLE)_' header-tmp.html
	cat header-tmp.html tmp.html footer.html > $@
	rm header-tmp.html tmp.html

docs/responsesurfaceplot.html: files/responsesurfaceplot.Rmd
	R -e 'getwd(); rmarkdown::render("$<", output_file="../$@")'

.PHONY: clean
clean:
	rm -rf $(DEST_DIR)

copy_files:
	mkdir -p docs/data
	cp *.js docs/
	cp style.css docs/
	rm -rf docs/images
	cp -r files/images docs/
	cp files/visualizeCollinearity-files/*.json docs/data
