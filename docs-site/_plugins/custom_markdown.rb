require 'jekyll'
require 'commonmarker'
require 'nokogiri'

module Jekyll
  module CustomMarkdownRenderer
    class Generator < Jekyll::Generator
      def generate(site)
        site.pages.each do |page|
          if page.ext == '.md' || page.ext == '.markdown'
            page.content = render_markdown(page.content)
          end
        end

        site.posts.docs.each do |post|
          post.content = render_markdown(post.content)
        end
      end

      def render_markdown(content)
        html = Commonmarker.to_html(content)
        process_html(html)
      end

      def process_html(content)
        doc = Nokogiri::HTML::DocumentFragment.parse(content)

       # Customize links
        doc.css('a').each do |link|
          custom_link = Nokogiri::XML::Node.new('hf-link', doc)
          link.add_next_sibling(custom_link)
          custom_link.add_child(link)
        end

        doc.to_html
      end
    end
  end
end