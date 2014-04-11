require 'rake/clean'

SITE_DIR = 'site'
STYLES = ['print.css', 'style.css', 'typeplate.css']

task :default => :guide_en

task :guide_en => "#{SITE_DIR}/guide.en.html"
task :guide_en => STYLES.map { |path| "#{SITE_DIR}/#{path}" }

directory SITE_DIR

file "#{SITE_DIR}/guide.en.html" => SITE_DIR
file "#{SITE_DIR}/guide.en.html" => 'conversion/layout.html.erb'
file "#{SITE_DIR}/guide.en.html" do |file|
	require 'kramdown'

	content = File.open('guide.en.md').read
	options = {
		:template => 'conversion/layout.html.erb'
	}

	doc = Kramdown::Document.new(content, options)

	File.open(file.name, 'w') { |f| f << doc.to_html }

	puts "kramdown #{file.name}"
end

STYLES.each do |path|
	source_path = "conversion/#{path}"

	file "#{SITE_DIR}/#{path}" => SITE_DIR
	file "#{SITE_DIR}/#{path}" => source_path
	file "#{SITE_DIR}/#{path}" do |file|
		cp source_path, file.name
	end
end

CLOBBER.include("#{SITE_DIR}/guide.en.html")
STYLES.each do |path|
	CLOBBER.include("#{SITE_DIR}/#{path}")
end
CLOBBER.include(SITE_DIR)

# This is free software released into the public domain (CC0 license).
