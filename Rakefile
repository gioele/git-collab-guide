require 'rake/clean'

SITE_DIR = 'site'
STYLES = ['print.css', 'style.css', 'typeplate.css', 'vanilla-slider.css']
SCRIPTS = ['vanilla-slider.js', 'slider.js']
GITHUB_IMAGES = %w[fork1 fork2 fork3 post-push1 post-push2 post-push3 post-push4 pr1 pr2 pr3 comment1 comment2 pr-update1 pr-update2 pr-update3 delete-branch1 delete-branch2].map { |path| "github/#{path}.png" }
TORTOISE_IMAGES = []
IMAGES = GITHUB_IMAGES + TORTOISE_IMAGES
HIGHLIGHTS = {
	'github/fork1.png' => '380,170 120,40 0,360',
	'github/fork2.png' => '935,73 40,25 0,360',
	'github/fork3.png' => '140,80 120,40 0,360',

	'github/post-push1.png' => '115,270 130,50 0,360',
	'github/post-push2.png' => '125,328 90,30 0,360',
	'github/post-push3.png' => '110,195 90,30 0,360',

	'github/pr1.png' => '700,280 115,35 0,360',
	'github/pr2.png' => '200,330 250,200 0,360',
	'github/pr3.png' => '840,390 100,35 0,360',

	'github/comment1.png' => '320,450 58,22 0,360',

	'github/delete-branch1.png' => '692,688 90,30 0,360',
}

task :default => :guide_en

task :guide_en => "#{SITE_DIR}/guide.en.html"
task :guide_en => (STYLES + SCRIPTS).map { |path| "#{SITE_DIR}/#{path}" }
task :guide_en => IMAGES.map { |path| "#{SITE_DIR}/images/#{path}" }

directory SITE_DIR
directory SITE_DIR + "/images"
directory SITE_DIR + "/images/github"

file "#{SITE_DIR}/guide.en.html" => SITE_DIR
file "#{SITE_DIR}/guide.en.html" => 'guide.en.md'
file "#{SITE_DIR}/guide.en.html" => 'conversion/layout.html.erb'
file "#{SITE_DIR}/guide.en.html" do |file|
	puts "kramdown #{file.name}"

	require 'kramdown'

	content = File.open('guide.en.md').read
	options = {
		:template => 'conversion/layout.html.erb',
		:toc_levels => [2, 3],
	}

	doc = Kramdown::Document.new(content, options)

	converted = doc.to_html
	converted.gsub!(/(\$) (.+)$/, '<span class="cmdline"><span class="prompt">\1 </span>\2</span>')

	File.open(file.name, 'w') { |f| f << converted }
end

(STYLES + SCRIPTS).each do |path|
	source_path = "conversion/#{path}"

	file "#{SITE_DIR}/#{path}" => SITE_DIR
	file "#{SITE_DIR}/#{path}" => source_path
	file "#{SITE_DIR}/#{path}" do |file|
		cp source_path, file.name
	end
end

GITHUB_IMAGES.each do |path|
	source_path = "images/#{path}"

	file "#{SITE_DIR}/images/#{path}" => SITE_DIR + "/images/github"
	file "#{SITE_DIR}/images/#{path}" => source_path
	file "#{SITE_DIR}/images/#{path}" do |file|
		puts "crop #{file.name}"

		crop_factor = '1000x800+262+0'
		system 'convert', source_path,
		       '-crop', crop_factor,
		       '+repage',
		       '-define', 'png:exclude-chunks=date',
		       file.name

		ellipse_params = HIGHLIGHTS[file.name.split('/').last(2).join('/')]
		if ellipse_params.nil?
			next
		end

		system 'convert', file.name,
		       '-stroke', 'red', '-strokewidth', '4',
		       '-fill', 'none',
		       '-draw', "ellipse #{ellipse_params}",
		       '-define', 'png:exclude-chunks=date',
		       '-set', 'Copyright', 'Creative Commons Attribution-ShareAlike 4.0 International',
		       file.name

		system 'optipng', file.name
	end
end

CLOBBER.include("#{SITE_DIR}/guide.en.html")
(STYLES + SCRIPTS).each do |path|
	CLOBBER.include("#{SITE_DIR}/#{path}")
end
IMAGES.each do |path|
	CLOBBER.include("#{SITE_DIR}/images/#{path}")
end
CLOBBER.include(SITE_DIR)

# This is free software released into the public domain (CC0 license).
