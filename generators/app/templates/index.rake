# rake hello[afei,bash]
desc "<%= description %>"
task :hello do
  puts "hello rake"
end

# rake hello_with_args[afei,bash]
desc 'want to say hello'
task :hello_with_args , [:name, :from] => :preview do |t, args|
  puts "hello world, #{args[:name]} from #{args[:from]}!"
end

task :default => :hello
