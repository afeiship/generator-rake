# load subtask:
Dir.glob("./tasks/*.rake").each do |task|
  load task
end

# main task list:
namespace :<%= namespace %> do
  # build & serve:
  desc "Serve for development"
  task :dev do
    if $?.to_i == 0
      sh "npm run dev"
    else
      abort "Npm runing failed: #{$?.to_i}\n#{out}\n"
    end
  end

  # rake hello_with_args[afei,bash]
  desc "want to say hello"
  task :hello, [:name, :from] do |task, args|
    args.with_defaults(
      :name => "fei",
      :from => "github",
    )

    puts "hello world, #{args[:name]} from #{args[:from]}!"
  end
end
