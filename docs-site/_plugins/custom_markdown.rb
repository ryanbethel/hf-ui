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
        html = Commonmarker.to_html(content, options: { render: { unsafe: true } })
        process_html(html)
      end

      def process_html(content)
        doc = Nokogiri::HTML::DocumentFragment.parse(content)

       # Customize lists
        doc.css('ul').each do |list|
          custom_list = Nokogiri::XML::Node.new('hf-list', doc)
          custom_list.set_attribute('type', 'none')
          list.add_next_sibling(custom_list)
          custom_list.add_child(list)
        end

       # Customize links
        doc.css('a').each do |link|
          custom_link = Nokogiri::XML::Node.new('hf-link', doc)
          link.add_next_sibling(custom_link)
          custom_link.add_child(link)
        end

        # Customize code tags - only those not inside pre tags
        doc.css('code').each do |code|
          # Skip if the code tag is inside a pre tag
          next if code.ancestors('pre').any?
          
          custom_code = Nokogiri::XML::Node.new('hf-code', doc)
          custom_code.content = code.content
          code.replace(custom_code)
        end

        doc.to_html
      end
    end
  end
end